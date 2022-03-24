import { Character } from 'characters';

export interface Puzzle {
    players: Array<Character>;

    enemies: Array<Character>;

    characters: Array<Character>;

    /** Hmm. No return? */
    run(): void;
}

/**
 * Represents a change to the Puzzle state.
 * Needs to be executed by the game itself.
 *
 * For characters to react to certain changes in the game, this should return a clone of the Puzzle.
 * 
 * If the callback form is too cumbersome, this can be changed into JSON instead and handled by a utility.
 */
export interface PuzzleEffect {
    (puzzle: Puzzle): Puzzle;
}