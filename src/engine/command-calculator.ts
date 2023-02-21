import { cloneDeep, differenceWith } from 'lodash-es';

import { OngoingEffect } from '../ongoing-effects';
import { Puzzle } from '../puzzle/index';

import { Action } from './action.interface';
import { Effect } from './effect.interface';

/**
 * Calculates the effects of commands onto the puzzle itself.
 */
export class CommandCalculator {
    /**
     * @returns a 2-tuple where the first value is the calculated effects and the second value is whether the game ends after the effect.
     */
    calculateChanges(
        puzzle: Puzzle,
        actions: Array<Action>,
        endGame: (puzzle: Puzzle) => boolean
    ): [Array<Effect>, boolean] {
        const copyPuzzle = cloneDeep(puzzle);

        const effects: Array<Effect> = [];

        for (const action of actions) {
            const copyAction = this.cloneAction(copyPuzzle, action);

            effects.push(this.calculateEffect(copyAction, action));

            if (endGame(copyPuzzle)) {
                return [effects, true];
            }
        }

        return [effects, false];
    }

    /**
     * Calculate the effects of commands.
     * @returns a configuration object for animators and characters to use
     */
    private calculateEffect(copy: Action, original: Action): Effect {
        this.executeStaminaCost(copy);

        const source = copy.source.map((character) => {
            return {
                character,
                delta: {
                    health: 0,
                    stamina: -copy.command.stamina,
                    staminaRegen: 0,
                    ongoingEffects: {
                        added: [],
                        removed: [],
                        current: character.current.ongoingEffects ?? [],
                    },
                },
            };
        });

        const targets = copy.targets.map((character) => {
            const currentStats = cloneDeep(character.current);

            this.executeEffect(copy);

            const newStats = character.current;

            const currentOngoingEffects = currentStats.ongoingEffects ?? [];
            const newOngoingEffects = newStats.ongoingEffects ?? [];

            const ongoingEffectComparator = (
                a: OngoingEffect,
                b: OngoingEffect
            ) => {
                return a.type === b.type;
            };

            return {
                character,
                delta: {
                    health: newStats.health - currentStats.health,
                    stamina: newStats.stamina - currentStats.stamina,
                    staminaRegen:
                        newStats.staminaRegen - currentStats.staminaRegen,
                    ongoingEffects: {
                        added: differenceWith(
                            newOngoingEffects,
                            currentOngoingEffects,
                            ongoingEffectComparator
                        ),
                        removed: differenceWith(
                            currentOngoingEffects,
                            newOngoingEffects,
                            ongoingEffectComparator
                        ),
                        current: newOngoingEffects,
                    },
                },
            };
        });

        return {
            source,
            targets,
            command: original.command,
            execute: () => this.executeEffect(original),
        };
    }

    private executeStaminaCost({ source, command }: Action): void {
        source.forEach((source) => {
            source.current.stamina -= command.stamina;
        });
    }

    private executeEffect(action: Action): void {
        const { command, targets } = action;

        targets.forEach((target) => {
            const currentOngoingEffects = target.current.ongoingEffects ?? [];
            const calculatedDamage = currentOngoingEffects.reduce(
                (currentDamage, effect) => {
                    return (
                        effect.changeDamage?.(currentDamage) ?? currentDamage
                    );
                },
                command.damage ?? 0
            );

            const damage = Math.max(0, calculatedDamage);

            const ongoingEffects = action.command.ongoingEffects ?? [];

            target.current.ongoingEffects = [
                ...currentOngoingEffects,
                ...ongoingEffects,
            ];

            target.current.health = Math.max(0, target.current.health - damage);
        });
    }

    private cloneAction(puzzle: Puzzle, original: Action): Action {
        const characters = [...puzzle.players, ...puzzle.enemies.characters];

        return {
            source: original.source.map((character) =>
                characters.find((c) => c.constructor === character.constructor)
            ),
            command: original.command,
            targets: original.targets.map((character) =>
                characters.find((c) => c.constructor === character.constructor)
            ),
        };
    }
}
