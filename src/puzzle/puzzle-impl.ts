import { Character } from 'characters';

import { Puzzle } from './puzzle.interface';

type PuzzleArgs = Pick<Puzzle, 'players' | 'enemies'>;

export class PuzzleImpl implements Puzzle {
    characters: Array<Character>;

    players: Array<Character>;
    enemies: Array<Character>;

    //
    private userInput: HTMLElement;
    private dogIcon: HTMLElement;

    constructor(args: PuzzleArgs) {
        this.players = args.players;
        this.enemies = args.enemies;

        this.characters = [...this.players, ...this.enemies];

        //
        this.userInput = document.getElementById('user-input');
        this.dogIcon = document.getElementById('dog-icon');
    }

    async run(): Promise<void> {
        while (!this.done()) {
            await this.listenForUserInput();
            await this.simulateGameCalculation();
        }

        return Promise.resolve();
    }

    private done(): boolean {
        return this.players.every(p => p.defeated()) || this.enemies.every(e => e.defeated());
    }

    private async listenForUserInput() {
        this.userInput.style.opacity = '1';

        return new Promise(resolve => {
            this.userInput.addEventListener('click', () => {
                resolve(undefined);
            }, { once: true });
        }).then(() => this.userInput.style.opacity = '0');
    }

    private async simulateGameCalculation() {
        const animation = this.dogIcon.animate([
            { transform: 'rotate(360deg)' },
        ], {
            duration: 600,
            iterations: 1,
        });

        return animation.finished;
    }
}
