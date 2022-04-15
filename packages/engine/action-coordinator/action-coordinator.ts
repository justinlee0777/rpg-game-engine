import { AI } from '../ai';
import { Character } from '../characters';
import { CharacterType } from '../characters/implementations';
import { Puzzle } from '../puzzle';
import { UIImplementation } from '../ui';

import { Action } from './action.interface';
import { CommandCalculatorInstance } from './command-calculator';
import { Effect, EffectReaction } from './effect.interface';
import { PriorityCalculatorInstance } from './priority-calculator';

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
        const actions: Array<CharacterSpecificAction> = PriorityCalculatorInstance.order(
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

            CommandCalculatorInstance.executeAction(action);

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

        await this.regenerateStamina(puzzle);

        return Promise.resolve(puzzle);
    }

    private isDecisiveTurn(puzzle: Puzzle): boolean {
        return (
            puzzle.victoryConditions.some(condition => condition(puzzle.enemies.characters))
            || puzzle.loseConditions.some(condition => condition(puzzle.players))
        );
    }

    /**
     * Regenerate characters' stamina at the end of the turn.
     */
    private regenerateStamina(puzzle: Puzzle): Promise<void> {
        return Promise.all([
            ...[...puzzle.players, ...puzzle.enemies.characters].map(character => {
                const { stamina, staminaRegen } = character.current;
                const newStamina = Math.min(stamina + staminaRegen, character.initial.stamina);

                character.current.stamina = newStamina;

                return this.uiImpl.Animator.animateStaminaRegen(character, newStamina)();
            }),
        ]).then(() => undefined);
    }
}