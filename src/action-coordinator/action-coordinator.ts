import { AI } from 'ai';
import { Puzzle } from 'puzzle';
import { AnimatorInstance } from 'ui-implementation/animator-impl';

import { Action } from './action.interface';
import { CommandCalculatorInstance } from './command-calculator';
import { Effect, EffectReaction } from './effect.interface';

/**
 * Represents the "calculation" stage of the game loop. The game takes the user's inputs and determines the flow of action.
 */
export class ActionCoordinator {

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
        playerActions = this.order(playerActions);
        const enemyActions = enemyAi.getActions(puzzle);

        // Order the player and the enemy's actions.
        const actions: Array<Action> = this.order([...playerActions, ...enemyActions]);
        // Calculate their reactions to actions against them.
        interface Turn {
            action: Action;
            effect: Effect;
            reaction: EffectReaction;
        }
        const turns = actions.reduce<Array<Turn>>((arr, action) => {
            const effect = CommandCalculatorInstance.calculateEffect(action);
            const reaction = CommandCalculatorInstance.calculateReaction(effect, action.targets);

            const turn = { action, effect, reaction };

            return arr.concat(turn);
        }, []);

        for (const { action, effect, reaction } of turns) {
            const { beforeEffect, runEffect, afterEffect } = AnimatorInstance.animateSkill(action.command.skillType, action.source);

            await beforeEffect();
            await Promise.all([
                new Promise(resolve => {
                    effect.execute();
                    resolve(undefined);
                }),
                runEffect(),
            ]);
            await AnimatorInstance.animateReaction(effect, reaction, action.targets)();

            await afterEffect();
        }

        return Promise.resolve(puzzle);
    }

    /**
     * @returns the actions by priority.
     */
    private order(actions: Array<Action>): Array<Action> {
        return actions.sort((a, b) => {
            return b.command.priority - a.command.priority;
        });
    }
}