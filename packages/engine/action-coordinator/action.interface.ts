import { Character } from '../characters';
import { Command } from '../commands';

/**
 * Represents a user-inputted action.
 */
export interface Action {
    /** The command the user selected. */
    command: Command;

    /**
     * The source of the action.
     * This may be refactored into the future to be one character. It is a list for now
     * so that multi-character interactions may be implemented, but that is not currently part of the game design.
     */
    source: Array<Character>;
    /**
     * The target of the action.
     * For example, if healing, healing an ally, if attacking, attacking an enemy.
     */
    targets: Array<Character>;
}
