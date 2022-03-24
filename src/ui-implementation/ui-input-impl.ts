import { ListenForUserInput } from 'ui/ui-input/ui-input.interface';

const userInput: HTMLElement = document.getElementById('user-input');

export const listenForUserInput: ListenForUserInput = async function listenForUserInput() {
    userInput.style.opacity = '1';

    return new Promise(resolve => {
        userInput.addEventListener('click', () => {
            resolve(undefined);
        }, { once: true });
    })
        .then(async () => {
            return [];
        })
        .finally(() => userInput.style.opacity = '0');
}