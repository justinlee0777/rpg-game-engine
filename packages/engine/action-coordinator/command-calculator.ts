import { cloneDeep } from 'lodash-es';

import { Character } from '../characters';
import { Command } from '../commands';
import { isHiding } from '../ongoing-effects/implementations';

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
            character.current.stamina = Math.max(character.current.stamina - command.stamina, 0);
        });
    }

    /**
     * Calculate the effects of commands.
     * @returns a configuration object for animators and characters to use
     */
    calculateEffect(action: Action): Effect {
        const { command, targets } = action;

        const damaging = !!command.damage;
        const hiding = isHiding(command);

        return {
            damaging,
            hiding,
            execute: () => {
                if (command.ongoingEffects) {
                    targets.forEach(target => {
                        this.applyOngoingEffect(target, command);
                    });
                }

                if (damaging) {
                    targets.forEach(target => {
                        this.calculateDamage(target, command);
                    });
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

    private applyOngoingEffect(target: Character, command: Command): void {
        let { ongoingEffects = [] } = target.current;

        ongoingEffects = ongoingEffects.map(ongoingEffect => cloneDeep(ongoingEffect));

        target.current.ongoingEffects = [...ongoingEffects, ...command.ongoingEffects];
    }

    private calculateDamage(target: Character, command: Command): void {
        if (isHiding(target)) {
            return;
        } else {
            target.current.health -= command.damage;
        }
    }
}

export const CommandCalculatorInstance = new CommandCalculator();
