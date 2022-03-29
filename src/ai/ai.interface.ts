import { Action } from 'action-coordinator';
import { Character } from 'characters';
import { Puzzle } from 'puzzle';

export interface AI {
    characters: Array<Character>;

    getActions(puzzle: Puzzle): Array<Action>;
}