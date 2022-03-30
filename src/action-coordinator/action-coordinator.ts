import { AI } from 'ai';
import { CommandType } from 'commands';
import { Puzzle } from 'puzzle';
import { AnimatorInstance } from 'ui-implementation/animator-impl';

import { Action } from './action.interface';

export class ActionCoordinator {
    async processPlayerInput(puzzle: Puzzle, playerActions: Array<Action>, enemyAi: AI): Promise<Puzzle> {
        playerActions = this.order(playerActions);
        const enemyActions = enemyAi.getActions(puzzle);

        const actions = this.order([...playerActions, ...enemyActions]);

        for (const action of actions) {
            const { beforeEffect, runEffect, afterEffect } = AnimatorInstance.animateSkill(action.command.skillType, action.source);

            await beforeEffect();
            await Promise.all([
                this.applyAction(action),
                runEffect(),
            ]);
            await afterEffect();
        }

        return Promise.resolve(puzzle);
    }

    /**
     * TODO: This needs to return an object so we can get the target's reaction.
     */
    private async applyAction(action: Action): Promise<void> {
        const { command, targets } = action;

        switch (command.type) {
            case CommandType.SKILL:
                targets.forEach(target => target.current.health -= command.damage);
                return;
            default:
                return;
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