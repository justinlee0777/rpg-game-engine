import { Action } from 'action-coordinator';
import { Hider } from 'characters/implementations';
import { Attack } from 'commands/implementations';
import { Puzzle } from 'puzzle';

import { AI } from '../ai.interface';

/**
 * Test AI.
 */
export class HiderAI implements AI {
    characters = [
        new Hider(),
    ];

    getActions(puzzle: Puzzle): Array<Action> {
        return [
            {
                command: new Attack(),
                targets: [puzzle.players[0]],
            },
        ];
    }
}