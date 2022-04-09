import { Action, Attack, Character, ListenForUserInput } from 'engine';

import { environment } from '../environment';

export function listenForUserInputFactory(): ListenForUserInput {
    const userInput: HTMLElement = document.getElementById('user-input');
    let createAction: (players: Array<Character>, enemies: Array<Character>) => Promise<Array<Action>>;

    if (environment.skipUserInput) {
        userInput.style.opacity = '0'
        createAction = (players, enemies) => Promise.resolve([
            {
                command: new Attack(),
                source: [players[0]],
                targets: [enemies[0]],
            },
        ]);
    } else {
        createAction = (players, enemies) => new Promise<Array<Action>>(resolve => {
            userInput.style.opacity = '1';
            userInput.addEventListener('click', () => {
                const actions = [
                    {
                        command: new Attack(),
                        source: [players[0]],
                        targets: [enemies[0]],
                    },
                ];
                resolve(actions);
            }, { once: true });
        })
            .finally(() => userInput.style.opacity = '0')
    }

    return async function listenForUserInput(players: Array<Character>, enemies: Array<Character>) {
        return createAction(players, enemies);
    };
}