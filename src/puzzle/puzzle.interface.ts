import { AI } from '../ai';
import { Character } from '../characters/index';

/**
 * Conditions for ending a specific puzzle.
 * Takes no arguments and assumes they are initialized at the same time the puzzle is, to keep them flexible.
 */
export interface EndCondition {
    (characters: Array<Character>): boolean;
}

/**
 * Metadata for the game. Should not contain any functions.
 */
export interface Puzzle {
    players: Array<Character>;

    enemies: AI;

    victoryConditions: Array<EndCondition>;

    loseConditions: Array<EndCondition>;
}

/**
 * Abstract step ran in the puzzle's queue.
 * For characters to react to certain changes in the game, this should return a clone of the Puzzle.
 */
export interface Step {
    (puzzle: Puzzle): Promise<Puzzle>;
}
