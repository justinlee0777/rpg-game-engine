import { Command } from 'commands';

export interface Stats {
    health: number;
}

/**
 * Represents one of the units in either the user or the enemy's parties.
 */
export interface Character {
    readonly initial: Readonly<Stats>;
    readonly commands: Array<Command>;

    current: Stats;
}
