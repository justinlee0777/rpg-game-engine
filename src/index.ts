import { listenForUserInput } from './ui-implementation/ui-input-impl';
import { CharacterType, Hider } from './characters/implementations';
import { Puzzle } from './puzzle';
import { HiderAI } from './ai/implementations';
import { ActionCoordinator } from './action-coordinator';
import { SpriteHelperInstance } from './ui-implementation/sprite-helper-impl';
import { CharacterSpriteMapInstance } from './ui-implementation/character-sprite-map-impl';
import { SpriteDrawerInstance } from './ui-implementation/sprite-drawer-impl';
import { Character } from './characters';

document.addEventListener('DOMContentLoaded', () => {
    const actionCoordinator = new ActionCoordinator();
    const enemyAi = new HiderAI();

    const players = [
        new Hider(),
    ];
    const enemies = new HiderAI();

    const setMap = (character: Character): HTMLElement => {
        const constructorFn = character.constructor as CharacterType;

        const element = SpriteHelperInstance.get(constructorFn);
        CharacterSpriteMapInstance.set(constructorFn, element);
        return element;
    }

    players.forEach(player => {
        const element = setMap(player);
        SpriteDrawerInstance.draw(element, { player: true });
    });

    enemies.characters.forEach(enemy => {
        const element = setMap(enemy);
        SpriteDrawerInstance.draw(element, { player: false });
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
            const actions = await listenForUserInput(players, enemyAi.characters);

            await actionCoordinator.iterateGame(puzzle, actions, enemyAi);
        }

        return Promise.resolve();
    })();
}, { once: true });