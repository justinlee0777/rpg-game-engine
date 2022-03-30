import { AI } from 'ai';
import { Puzzle } from 'puzzle';
import { AnimatorInstance } from 'ui-implementation/animator-impl';

import { Action } from './action.interface';
import { CommandCalculatorInstance } from './command-calculator';

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

        const actions = this.order([...playerActions, ...enemyActions]);

        // TODO incorporate reactions
        for (const action of actions) {
            const { beforeEffect, runEffect, afterEffect } = AnimatorInstance.animateSkill(action.command.skillType, action.source);

            await beforeEffect();
            await Promise.all([
                new Promise(resolve => {
                    CommandCalculatorInstance.calculateEffect(action).execute();
                    resolve(undefined);
                }),
                runEffect(),
            ]);
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