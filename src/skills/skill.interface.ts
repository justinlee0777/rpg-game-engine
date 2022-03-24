import { Puzzle, PuzzleEffect } from 'puzzle';

export interface Skill {
    displayName: string;
    description: string;

    damage: number;

    run(puzzle: Puzzle): PuzzleEffect;
}