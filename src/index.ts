import { listenForUserInput } from './ui-implementation/ui-input-impl';
import { Hider } from './characters/implementations';
import { Puzzle } from './puzzle';
import { HiderAI } from './ai/implementations';
import { ActionCoordinator } from './action-coordinator';
import { SpriteHelperInstance } from './ui-implementation/sprite-helper-impl';

document.addEventListener('DOMContentLoaded', () => {
    const actionCoordinator = new ActionCoordinator();
    const enemyAi = new HiderAI();

    const players = [
        new Hider(SpriteHelperInstance.get()),
    ];
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

    (async function run(): Promise<void> {
        while (puzzle.victoryConditions.every(victoryCondition => !victoryCondition())) {
            const actions = await listenForUserInput(players, enemyAi.characters);

            await actionCoordinator.processPlayerInput(puzzle, actions, enemyAi);
        }

        return Promise.resolve();
    })();
}, { once: true });