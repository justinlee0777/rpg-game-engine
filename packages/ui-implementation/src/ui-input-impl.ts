import { Action, Attack, Character, Command, ListenForUserInput } from 'engine';
import { FasterAttack } from 'packages/engine/commands/skills/implementations/faster-attack';
import { FastestAttack } from 'packages/engine/commands/skills/implementations/fastest-attack';
import { Hide } from 'packages/engine/commands/skills/implementations/hide';

import { environment } from '../environment';

export function listenForUserInputFactory(): ListenForUserInput {
    const userInput: HTMLElement = document.getElementById('attacks');
    let createAction: (
        players: Array<Character>,
        enemies: Array<Character>
    ) => Promise<Array<Action>>;

    if (environment.skipUserInput) {
        userInput.style.opacity = '0';
        createAction = (players, enemies) =>
            Promise.resolve([
                {
                    command: new Attack(),
                    source: [players[0]],
                    targets: [enemies[0]],
                },
            ]);
    } else {
        createAction = (players, enemies) =>
            new Promise<Array<Action>>((resolve) => {
                userInput.style.opacity = '1';
                userInput.addEventListener(
                    'click',
                    (event) => {
                        const button = event.target as HTMLElement;

                        let command: Command;
                        let targets: Array<Character>;

                        switch (button.id) {
                            case 'attack':
                                command = new Attack();
                                targets = [enemies[0]];
                                break;
                            case 'faster-attack':
                                command = new FasterAttack();
                                targets = [enemies[0]];
                                break;
                            case 'fastest-attack':
                                command = new FastestAttack();
                                targets = [enemies[0]];
                                break;
                            case 'hide':
                                command = new Hide();
                                targets = [players[0]];
                                break;
                        }

                        const actions = [
                            {
                                command,
                                source: [players[0]],
                                targets,
                            },
                        ];
                        resolve(actions);
                    },
                    { once: true }
                );
            }).finally(() => (userInput.style.opacity = '0'));
    }

    return async function listenForUserInput(
        players: Array<Character>,
        enemies: Array<Character>
    ) {
        return createAction(players, enemies);
    };
}
