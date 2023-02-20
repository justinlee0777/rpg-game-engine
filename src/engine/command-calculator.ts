import { cloneDeep } from 'lodash-es';

import { OngoingEffect } from '../ongoing-effects';
import { Character } from '../characters/index';

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
        source.forEach((character) => {
            character.current.stamina = Math.max(
                character.current.stamina - command.stamina,
                0
            );
        });
    }

    /**
     * Calculate the effects of commands.
     * @returns a configuration object for animators and characters to use
     */
    calculateEffect(action: Action): Effect {
        const { command, targets } = action;

        const targetEffects = targets.map((target) => {
            const ongoingEffects = target.current.ongoingEffects ?? [];
            const calculatedDamage = ongoingEffects.reduce(
                (currentDamage, effect) => {
                    return (
                        effect.changeDamage?.(currentDamage) ?? currentDamage
                    );
                },
                command.damage ?? 0
            );

            const damage = Math.max(0, calculatedDamage);

            return {
                target,
                damage,
                appliedEffects: [...(command.ongoingEffects ?? [])],
            };
        });

        return {
            targets: targetEffects,
            execute: () => {
                targetEffects.forEach((effect) => {
                    const { target, appliedEffects, damage } = effect;

                    this.applyOngoingEffect(target, appliedEffects);
                    target.current.health = Math.max(
                        0,
                        target.current.health - damage
                    );
                });
            },
        };
    }

    /**
     * Calculate a target's reaction to an effect,
     */
    calculateReaction(
        effect: Effect,
        targets: Array<Character>
    ): EffectReaction {
        // For now, foiling is not implemented as there is no character that can foil.
        return { source: effect };
    }

    private applyOngoingEffect(
        target: Character,
        ongoingEffects: Array<OngoingEffect>
    ): void {
        const currentOngoingEffects = target.current.ongoingEffects ?? [];

        ongoingEffects = ongoingEffects.map((ongoingEffect) =>
            cloneDeep(ongoingEffect)
        );

        target.current.ongoingEffects = [
            ...currentOngoingEffects,
            ...ongoingEffects,
        ];
    }
}
