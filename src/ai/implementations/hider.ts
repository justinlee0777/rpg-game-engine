import { Action } from 'action-coordinator';
import { Hider } from 'characters/implementations';
import { Attack } from 'commands/implementations';
import { Puzzle } from 'puzzle';
import { SpriteHelperInstance } from 'ui-implementation/sprite-helper-impl';

import { AI } from '../ai.interface';

/**
 * Test AI.
 */
export class HiderAI implements AI {
    characters = [
        new Hider(SpriteHelperInstance.get()),
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