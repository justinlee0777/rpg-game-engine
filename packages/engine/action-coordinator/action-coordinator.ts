import { AI } from '../ai';
import { Character } from '../characters';
import { CharacterType } from '../characters/implementations';
import { EndCondition, Puzzle } from '../puzzle';
import { UIImplementation } from '../ui';

import { Action } from './action.interface';
import { CommandCalculatorInstance } from './command-calculator';
import { Effect, EffectReaction } from './effect.interface';

interface CharacterSpecificAction extends Action {
    player: boolean;
}

interface Turn {
    action: CharacterSpecificAction;
    effect: Effect;
    reaction: EffectReaction;
}

/**
 * Represents the "calculation" stage of the game loop. The game takes the user's inputs and determines the flow of action.
 */
export class ActionCoordinator {

    constructor(private uiImpl: UIImplementation) {
    }

    /**
     * Given:
     * 1. The player's input.
     *
     * Do:
     * 1. Get the AI's actions.
     * 2. Order all actions.
     * 3. Get reactions to actions, thereby getting the full list of actions.
     * 4. Get the sequence of animations/calculations.
     * 5. Run.
     */
    async iterateGame(puzzle: Puzzle, playerActions: Array<Action>, enemyAi: AI): Promise<Puzzle> {
        const enemyActions = enemyAi.getActions(puzzle);

        // Order the player and the enemy's actions.
        const actions: Array<CharacterSpecificAction> = this.order(
            [
                ...playerActions.map(action => ({ ...action, player: true })),
                ...enemyActions.map(action => ({ ...action, player: false })),
            ]
        );

        // Calculate their reactions to actions against them.
        const turns: Array<Turn> = actions.map(action => {
            const effect = CommandCalculatorInstance.calculateEffect(action);
            const reaction = CommandCalculatorInstance.calculateReaction(effect, action.targets);

            return { action, effect, reaction };
        });

        for (const { action, effect, reaction } of turns) {
            const { beforeEffect, runEffect, afterEffect } = this.uiImpl.Animator.animateSkill(action.command.skillType, action.source);

            await beforeEffect();
            await Promise.all([
                new Promise(resolve => {
                    effect.execute();
                    resolve(undefined);
                }),
                runEffect(),
            ]);
            await this.uiImpl.Animator.animateReaction(effect, reaction, action.targets)();

            await afterEffect();

            if (this.isDecisiveTurn(puzzle)) {
                break;
            }
        }

        return Promise.resolve(puzzle);
    }

    /**
     * @returns the actions by priority.
     */
    private order(actions: Array<CharacterSpecificAction>): Array<CharacterSpecificAction> {
        return actions.sort((a, b) => {
            return b.command.priority - a.command.priority;
        });
    }

    private isDecisiveTurn(puzzle: Puzzle): boolean {
        return (
            puzzle.victoryConditions.some(condition => condition(puzzle.enemies.characters))
            || puzzle.loseConditions.some(condition => condition(puzzle.players))
        );
    }
}