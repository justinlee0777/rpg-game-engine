import { Character } from '../characters';
import { OngoingEffect } from '../ongoing-effects';
import { Effect } from './effect.interface';

export enum GameEventType {
    ACTION = 'action',
    ONGOING_EFFECT = 'ongoingEffect',
    STAMINA_REGEN = 'staminaRegeneration',
    END_GAME = 'endGame',
}

export interface ActionEvent {
    event: Effect;
    type: GameEventType.ACTION;
}
export interface OngoingEffectEvent {
    event: {
        execute(): Map<Character, Array<OngoingEffect>>;
    };
    type: GameEventType.ONGOING_EFFECT;
}

export interface StaminaRegenEvent {
    event: {
        execute(): void;
    };
    type: GameEventType.STAMINA_REGEN;
}

export interface EndGameEvent {
    type: GameEventType.END_GAME;
}

export type GameEvent =
    | ActionEvent
    | OngoingEffectEvent
    | StaminaRegenEvent
    | EndGameEvent;
