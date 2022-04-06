import {
    ActionCoordinator,
    Character,
    CharacterType,
    Hider,
    HiderAI,
    Puzzle,
} from 'engine';

import { UIImpl } from './src';

document.addEventListener('DOMContentLoaded', () => {
    const actionCoordinator = new ActionCoordinator(UIImpl);
    const enemyAi = new HiderAI();

    const players = [
        new Hider(),
    ];
    const enemies = new HiderAI();

    const setMap = (character: Character) => {
        const constructorFn = character.constructor as CharacterType;

        const element = UIImpl.SpriteHelper.get(constructorFn);
        UIImpl.CharacterSpriteMap.set(constructorFn, element);
        return element;
    }

    players.forEach(player => {
        const element = setMap(player);
        UIImpl.SpriteDrawer.draw(element, { player: true });
    });

    enemies.characters.forEach(enemy => {
        const element = setMap(enemy);
        UIImpl.SpriteDrawer.draw(element, { player: false });
    });

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
            const actions = await UIImpl.listenForUserInput(players, enemyAi.characters);

            await actionCoordinator.iterateGame(puzzle, actions, enemyAi);
        }

        return Promise.resolve();
    })();
}, { once: true });