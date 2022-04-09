import { Character } from '../characters';

import { Action } from './action.interface';
import { Effect, EffectReaction } from './effect.interface';

/**
 * Calculates the effects of commands onto the puzzle itself.
 */
export class CommandCalculator {
    /**
     * Calculates and executes the effects of an action solely on the source itself.
     * For now, simply removes stamina costs.
     */
    executeAction({ command, source }: Action): void {
        source.forEach(character => {
            character.current.stamina -= command.stamina;
        });
    }

    /**
     * Calculate the effects of commands.
     * @returns a configuration object for animators and characters to use
     */
    calculateEffect(action: Action): Effect {
        const { command, targets } = action;

        const damaging = !!command.damage;

        return {
            damaging,
            execute: () => {
                if (damaging) {
                    targets.forEach(target => target.current.health -= command.damage);
                }
            },
        };
    }

    /**
     * Calculate a target's reaction to an effect,
     */
    calculateReaction(effect: Effect, targets: Array<Character>): EffectReaction {
        // For now, foiling is not implemented as there is no character that can foil.
        return { source: effect };
    }
}

export const CommandCalculatorInstance = new CommandCalculator();
