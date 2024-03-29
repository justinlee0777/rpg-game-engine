import { Command } from '../commands';
import { OngoingEffect } from '../ongoing-effects';

/**
 * Character's metadata.
 */
export interface Stats {
    /** Points before the character is unconscious/defeated. */
    health: number;
    /** Points used to determine the priority/stagger of skills. */
    stamina: number;
    /** Stamina regenerated at the beginning of the input phase. */
    staminaRegen: number;
    /** Ongoing effects. */
    ongoingEffects?: Array<OngoingEffect>;
}

/**
 * Represents one of the units in either the user or the enemy's parties.
 * This should only contain game-relevant information i.e stats.
 */
export interface Character {
    /**
     * The stats the character was initialized with.
     */
    readonly initial: Readonly<Stats>;
    /**
     * Commands available for a given character.
     */
    readonly commands: Array<Command>;

    /**
     * The stats the character currently has.
     */
    current: Stats;

    type: string;
}
