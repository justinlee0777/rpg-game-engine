import { Action } from 'action-coordinator';
import { Test } from 'characters/implementations';
import { Attack } from 'commands/implementations';
import { Puzzle } from 'puzzle';

import { AI } from '../ai.interface';

/**
 * Test AI.
 */
export class HiderAI implements AI {
    characters = [
        new Test(),
    ];

    getActions(puzzle: Puzzle): Array<Action> {
        return [
            {
                command: new Attack(),
                source: this.characters,
                targets: [puzzle.players[0]],
            },
        ];
    }
}