import { Action } from 'action-coordinator';
import { AI } from 'ai';
import { Character } from 'characters';
import { Attack } from 'commands/implementations';
import { ListenForUserInput } from 'ui/ui-input/ui-input.interface';

const userInput: HTMLElement = document.getElementById('user-input');

export const listenForUserInput: ListenForUserInput = async function listenForUserInput(players: Array<Character>, enemies: Array<Character>) {
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
}