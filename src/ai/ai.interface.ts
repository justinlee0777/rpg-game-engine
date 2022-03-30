import { Action } from 'action-coordinator';
import { Character } from 'characters';
import { Puzzle } from 'puzzle';

/**
 * Represents a non-player party.
 * Mainly used to represent enemies. Not in the game specification to implement "allies", but could be
 * used for that.
 */
export interface AI {
    /**
     * Characters belonging to the party.
     */
    characters: Array<Character>;

    /**
     * Enemy AI computes what actions to take for a given turn based on the current state
     * of the game.
     */
    getActions(puzzle: Puzzle): Array<Action>;
}