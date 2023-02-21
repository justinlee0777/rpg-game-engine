import { OngoingEffect } from '../ongoing-effects';
import { Character, Stats } from '../characters';
import { Command } from '../commands';

export interface EffectDelta extends Omit<Stats, 'ongoingEffects'> {
    ongoingEffects: {
        current: Array<OngoingEffect>;
        added: Array<OngoingEffect>;
        removed: Array<OngoingEffect>;
    };
}

export interface EffectedCharacter {
    character: Character;
    delta: EffectDelta;
}

export enum EffectType {
    ACTION = 'Action',
    ONGOING_EFFECT = 'OngoingEffect',
    STAMINA_REGEN = 'StaminaRegen',
    END_GAME = 'EndGame',
}

export interface ActionEffect {
    source: Array<EffectedCharacter>;
    targets: Array<EffectedCharacter>;
    /** Execute the action, causing some effect on the puzzle itself. */
    execute(): void;
    command: Command;
    type: EffectType.ACTION;
}

export interface OngoingEffectEffect {
    characters: Array<EffectedCharacter>;
    execute(): void;
    type: EffectType.ONGOING_EFFECT;
}

export interface StaminaRegenEffect {
    characters: Array<EffectedCharacter>;
    execute(): void;
    type: EffectType.STAMINA_REGEN;
}

export interface EndGameEffect {
    type: EffectType.END_GAME;
}

/**
 * Effect of an action.
 */
export type Effect =
    | ActionEffect
    | OngoingEffectEffect
    | StaminaRegenEffect
    | EndGameEffect;
