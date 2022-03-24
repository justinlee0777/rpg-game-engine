const userInput = document.getElementById('user-input');
const dogIcon = document.getElementById('dog-icon');

async function listenForUserInput() {
    userInput.style.opacity = 1;

    return new Promise(resolve => {
        userInput.addEventListener('click', () => {
            resolve();
        }, { once: true });
    }).then(() => userInput.style.opacity = 0);
}

async function simulateGameCalculation() {
    const animation = dogIcon.animate([
        { transform: 'rotate(360deg)' },
    ], {
        duration: 600,
        iterations: 1,
    });

    return animation.finished;
}

async function gameLoop() {
    while (true) {
        await listenForUserInput();
        await simulateGameCalculation();
    }
}

gameLoop();