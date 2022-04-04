import { Command } from 'commands';

/**
 * Character's metadata.
 */
export interface Stats {
    /** Points before the character is unconscious/defeated. */
    health: number;
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
}
