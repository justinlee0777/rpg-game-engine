import { Character } from '../characters/index';
import { Command, Priority } from '../commands';
import { Action } from './action.interface';

/**
 * Calculates priority using these variables:
 * - A command's assigned priority;
 * - A command's stamina cost;
 * - The character's current stamina.
 *
 * This is exported so the UI may display a hint of the ultimate turn order.
 */
export class PriorityCalculator {
    private readonly orderedPriorityAsc = [
        Priority.SLOW,
        Priority.DELIBERATIVE,
        Priority.EAGER,
        Priority.QUICK,
        Priority.IMMEDIATE,
    ];

    calculate(command: Command, character: Character): Priority {
        if (character.current.stamina > command.stamina) {
            // If the character has enough stamina, the assigned priority is used.
            return command.priority;
        } else {
            // If the character does not have enough stamina,

            // calculate the difference
            const difference = command.stamina - character.current.stamina;

            let currentPriorityIndex = this.orderedPriorityAsc.findIndex(
                (priority) => priority === command.priority
            );

            currentPriorityIndex =
                currentPriorityIndex - Math.floor(difference / 5);

            if (currentPriorityIndex < 0) {
                return Priority.DEAD_LAST;
            } else {
                return this.orderedPriorityAsc[currentPriorityIndex];
            }
        }
    }

    order<T extends Action>(actions: Array<T>): Array<T> {
        interface PrioritizedAction {
            action: T;
            priority: Priority;
        }

        const prioritizedActions: Array<PrioritizedAction> = actions.map(
            (action) => ({
                action,
                /** TODO: incorporate multiple sources. If makes sense. */
                priority: this.calculate(action.command, action.source[0]),
            })
        );

        return prioritizedActions
            .sort((a, b) => {
                return b.priority - a.priority;
            })
            .map(({ action }) => action);
    }
}
