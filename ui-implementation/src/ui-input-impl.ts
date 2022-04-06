import { Action, Attack, Character, ListenForUserInput } from 'engine';

const userInput: HTMLElement = document.getElementById('user-input');

export function listenForUserInputFactory(): ListenForUserInput {
    return async function listenForUserInput(players: Array<Character>, enemies: Array<Character>) {
        userInput.style.opacity = '1';

        return new Promise<Array<Action>>(resolve => {
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
            .finally(() => userInput.style.opacity = '0');
    };
}