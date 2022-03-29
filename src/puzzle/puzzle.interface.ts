import { AI } from 'ai';
import { Character } from 'characters';

export interface EndCondition {
    (): boolean;
}

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
