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

/**
 * Effect of an action. Used only to get reactions from a character.
 */
export interface Effect {
    source: Array<{
        character: Character;
        delta: EffectDelta;
    }>;
    targets: Array<{
        character: Character;
        delta: EffectDelta;
    }>;
    /** Execute the action, causing some effect on the puzzle itself. */
    execute(): void;
    command: Command;
}
