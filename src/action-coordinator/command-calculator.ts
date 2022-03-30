import { Action } from './action.interface';
import { Effect } from './effect.interface';

export class CommandCalculator {
    calculateEffect(action: Action): Effect {
        const { command, targets } = action;

        const damaging = command.damage !== 0;

        return {
            damaging,
            execute: () => {
                if (damaging) {
                    targets.forEach(target => target.current.health -= command.damage);
                }
            },
        };
    }
}

export const CommandCalculatorInstance = new CommandCalculator();
