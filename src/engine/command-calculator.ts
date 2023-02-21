import { cloneDeep, differenceWith } from 'lodash-es';

import { Stats } from '../characters';
import { OngoingEffect } from '../ongoing-effects';
import { Puzzle } from '../puzzle/index';

import { Action } from './action.interface';
import {
    ActionEffect,
    Effect,
    EffectDelta,
    EffectType,
    OngoingEffectEffect,
    StaminaRegenEffect,
} from './effect.interface';

/**
 * Calculates the effects of commands onto the puzzle itself.
 */
export class CommandCalculator {
    calculateChanges(
        puzzle: Puzzle,
        actions: Array<Action>,
        endGame: (puzzle: Puzzle) => boolean
    ): Array<Effect> {
        const copyPuzzle = cloneDeep(puzzle);

        const gameFlow: Array<() => Effect> = [
            () => this.calculateOngoingEffectsStartOfTurn(copyPuzzle, puzzle),
            ...actions.map((action) => {
                const copyAction = this.cloneAction(copyPuzzle, action);

                return () => this.calculateEffect(copyAction, action);
            }),
            () => this.calculateOngoingEffectsEndOfTurn(copyPuzzle, puzzle),
            () => this.calculateStaminaRegen(copyPuzzle, puzzle),
        ];

        const effects: Array<Effect> = [];

        for (const gameEffect of gameFlow) {
            effects.push(gameEffect());

            if (endGame(copyPuzzle)) {
                effects.push({
                    type: EffectType.END_GAME,
                });

                break;
            }
        }

        return effects;
    }

    /**
     * Calculate the effects of commands.
     * @returns a configuration object for animators and characters to use
     */
    private calculateEffect(copy: Action, original: Action): ActionEffect {
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

            return {
                delta: this.createDelta(currentStats, newStats),
                character,
            };
        });

        return {
            source,
            targets,
            command: original.command,
            execute: () => this.executeEffect(original),
            type: EffectType.ACTION,
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

            const ongoingEffects = (action.command.ongoingEffects ?? []).map(
                (ongoingEffect) => ongoingEffect.apply()
            );

            target.current.ongoingEffects = [
                ...currentOngoingEffects,
                ...ongoingEffects,
            ];

            target.current.health = Math.max(0, target.current.health - damage);
        });
    }

    private calculateOngoingEffectsStartOfTurn(
        copy: Puzzle,
        original: Puzzle
    ): OngoingEffectEffect {
        const characters = [...copy.players, ...copy.enemies.characters];
        const clonedCharacters = cloneDeep(characters);

        this.executeOngoingEffects(copy);

        const characterData = characters.map((character) => {
            const clonedCharacter = clonedCharacters.find(
                (c) => c.type === character.type
            );

            return {
                delta: this.createDelta(
                    clonedCharacter.current,
                    character.current
                ),
                character,
            };
        });

        return {
            characters: characterData,
            type: EffectType.ONGOING_EFFECT,
            execute: () => this.executeOngoingEffects(original),
        };
    }

    private calculateOngoingEffectsEndOfTurn(
        copy: Puzzle,
        original: Puzzle
    ): OngoingEffectEffect {
        const characters = [...copy.players, ...copy.enemies.characters];
        const clonedCharacters = cloneDeep(characters);

        this.executeOngoingEffects(copy, true);

        const characterData = characters.map((character) => {
            const clonedCharacter = clonedCharacters.find(
                (c) => c.type === character.type
            );

            return {
                delta: this.createDelta(
                    clonedCharacter.current,
                    character.current
                ),
                character,
            };
        });

        return {
            characters: characterData,
            type: EffectType.ONGOING_EFFECT,
            execute: () => this.executeOngoingEffects(original, true),
        };
    }

    private executeOngoingEffects(
        puzzle: Puzzle,
        subtractTurnDuration = false
    ): void {
        const characters = [...puzzle.players, ...puzzle.enemies.characters];

        characters.forEach((character) => {
            const ongoingEffects: Array<OngoingEffect> = [];

            character.current.ongoingEffects?.forEach((ongoingEffect) => {
                if (subtractTurnDuration) {
                    ongoingEffect.turnDuration -= 1;
                }

                if (ongoingEffect.turnDuration > 0) {
                    ongoingEffects.push(ongoingEffect);
                }
            });

            character.current.ongoingEffects = ongoingEffects;
        });
    }

    private calculateStaminaRegen(
        copy: Puzzle,
        original: Puzzle
    ): StaminaRegenEffect {
        const characters = [...copy.players, ...copy.enemies.characters];
        const clonedCharacters = cloneDeep(characters);

        this.executeStaminaRegen(copy);

        const characterData = characters.map((character) => {
            const clonedCharacter = clonedCharacters.find(
                (c) => c.type === character.type
            );

            return {
                delta: this.createDelta(
                    clonedCharacter.current,
                    character.current
                ),
                character,
            };
        });

        return {
            characters: characterData,
            type: EffectType.STAMINA_REGEN,
            execute: () => this.executeStaminaRegen(original),
        };
    }

    private executeStaminaRegen(puzzle: Puzzle): void {
        const characters = [...puzzle.players, ...puzzle.enemies.characters];

        characters.forEach((character) => {
            const { stamina, staminaRegen } = character.current;
            const newStamina = Math.min(
                stamina + staminaRegen,
                character.initial.stamina
            );

            character.current.stamina = newStamina;
        });
    }

    private createDelta(currentStats: Stats, newStats: Stats): EffectDelta {
        const currentOngoingEffects = currentStats.ongoingEffects ?? [];
        const newOngoingEffects = newStats.ongoingEffects ?? [];

        const [added, removed] = this.getOngoingEffectDelta(
            currentOngoingEffects,
            newOngoingEffects
        );

        return {
            health: newStats.health - currentStats.health,
            stamina: newStats.stamina - currentStats.stamina,
            staminaRegen: newStats.staminaRegen - currentStats.staminaRegen,
            ongoingEffects: {
                added,
                removed,
                current: newOngoingEffects,
            },
        };
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

    private getOngoingEffectDelta(
        currentEffects: Array<OngoingEffect>,
        newEffects: Array<OngoingEffect>
    ): [Array<OngoingEffect>, Array<OngoingEffect>] {
        return [
            newEffects.filter(
                (newEffect) =>
                    !currentEffects.some(
                        (currentEffect) => currentEffect.type === newEffect.type
                    )
            ),
            currentEffects.filter(
                (currentEffect) =>
                    !newEffects.some(
                        (newEffect) => newEffect.type === currentEffect.type
                    )
            ),
        ];
    }
}
