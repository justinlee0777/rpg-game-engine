import { listenForUserInput } from './ui-implementation/ui-input-impl';

import { Hider } from './characters/implementations';

import { Puzzle } from './puzzle';

document.addEventListener('DOMContentLoaded', () => {
    const dogIcon = document.getElementById('dog-icon');

    async function simulateGameCalculation() {
        const animation = dogIcon.animate([
            { transform: 'rotate(360deg)' },
        ], {
            duration: 600,
            iterations: 1,
        });

        return animation.finished;
    }

    async function run(puzzle: Puzzle): Promise<void> {
        while (puzzle.victoryConditions.every(victoryCondition => !victoryCondition())) {
            await listenForUserInput();
            await simulateGameCalculation();
        }

        return Promise.resolve();
    }

    const players = [new Hider()];
    const enemies = [new Hider()];

    const puzzle: Puzzle = {
        players,
        enemies,
        victoryConditions: [
            () => enemies.every(e => e.current.health <= 0),
        ],
        loseConditions: [
            () => players.every(p => p.current.health <= 0),
        ],
    };

    run(puzzle);
}, { once: true });