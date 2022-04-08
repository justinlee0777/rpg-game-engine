import { Character } from '../characters';
import { Puzzle } from '../puzzle';

/**
 * Effect of an action. Used only to get reactions from a character.
 */
export interface Effect {
    /** Execute the action, causing some effect on the puzzle itself. */
    execute(): void;

    /** Whether the effect is damaging. */
    damaging: boolean;
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
