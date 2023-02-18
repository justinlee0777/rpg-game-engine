import { Action } from './action.interface';
import { Effect, EffectReaction } from './effect.interface';

export enum GameEventType {
    ACTION = 'action',
    ONGOING_EFFECT = 'ongoingEffect',
    STAMINA_REGEN = 'staminaRegeneration',
    END_GAME = 'endGame',
}

export interface ActionEvent {
    event: {
        action: Action;
        effect: Effect;
        reaction: EffectReaction;
        execute(): void;
    };
    type: GameEventType.ACTION;
}
export interface OngoingEffectEvent {
    event: {
        execute(): void;
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

export type GameEvent = ActionEvent | OngoingEffectEvent | StaminaRegenEvent;
