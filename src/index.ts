import { listenForUserInput } from './ui-implementation/ui-input-impl';
import { Hider } from './characters/implementations';
import { Puzzle } from './puzzle';
import { HiderAI } from './ai/implementations';
import { ActionCoordinator } from './action-coordinator';

document.addEventListener('DOMContentLoaded', () => {
    const actionCoordinator = new ActionCoordinator();
    const enemyAi = new HiderAI();

    async function run(puzzle: Puzzle): Promise<void> {
        while (puzzle.victoryConditions.every(victoryCondition => !victoryCondition())) {
            const actions = await listenForUserInput(enemyAi);

            await actionCoordinator.processPlayerInput(puzzle, actions, enemyAi);
        }

        return Promise.resolve();
    }

    const players = [new Hider()];
    const enemies = new HiderAI();

    const puzzle: Puzzle = {
        players,
        enemies,
        victoryConditions: [
            () => enemies.characters.every(e => e.current.health <= 0),
        ],
        loseConditions: [
            () => players.every(p => p.current.health <= 0),
        ],
    };

    run(puzzle);
}, { once: true });