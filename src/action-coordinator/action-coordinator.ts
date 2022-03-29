import { AI } from 'ai';
import { CommandType } from 'commands';
import { Puzzle } from 'puzzle';

import { Action } from './action.interface';

export class ActionCoordinator {
    async processPlayerInput(puzzle: Puzzle, playerActions: Array<Action>, enemyAi: AI): Promise<Puzzle> {
        playerActions = this.order(playerActions);
        const enemyActions = enemyAi.getActions(puzzle);

        const actions = this.order([...playerActions, ...enemyActions]);

        for (const action of actions) {
            const { beforeEffect, runEffect, afterEffect } = action.command.animation;

            await beforeEffect();
            await Promise.all([
                this.applyAction(action),
                runEffect(),
            ]);
            await afterEffect();
        }

        return Promise.resolve(puzzle);
    }

    private applyAction(action: Action): Promise<void> {
        const { command, targets } = action;

        switch (command.type) {
            case CommandType.SKILL:
                return new Promise(resolve => {
                    targets.forEach(target => target.current.health -= command.damage);
                    resolve();
                });
            default:
                return Promise.resolve();
        }
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