import { AI } from 'ai';
import { Attack } from 'commands/implementations';
import { ListenForUserInput } from 'ui/ui-input/ui-input.interface';

const userInput: HTMLElement = document.getElementById('user-input');

export const listenForUserInput: ListenForUserInput = async function listenForUserInput(enemyAi: AI) {
    userInput.style.opacity = '1';

    return new Promise(resolve => {
        userInput.addEventListener('click', () => {
            const actions = [
                {
                    command: new Attack(),
                    targets: [enemyAi.characters[0]],
                },
            ];
            resolve(actions);
        }, { once: true });
    })
        .then(async () => {
            return [];
        })
        .finally(() => userInput.style.opacity = '0');
}