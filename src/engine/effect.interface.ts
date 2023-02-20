import { OngoingEffect } from '../ongoing-effects';
import { Character } from '../characters';

export interface TargetEffect {
    target: Character;
    damage: number;
    appliedEffects?: Array<OngoingEffect>;
}

/**
 * Effect of an action. Used only to get reactions from a character.
 */
export interface Effect {
    targets: Array<TargetEffect>;
    /** Execute the action, causing some effect on the puzzle itself. */
    execute(): void;
}

/**
 * The reaction to an effect. @see EffectReaction#foiled for details.
 */
export interface EffectReaction {
    source: Effect;
    /**
     * Whether the effect is foiled or not. If this is filled, this means the effect is foiled.
     */
    foiled?: Effect;
}
