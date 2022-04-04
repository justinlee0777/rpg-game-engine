import { CharacterConfig, SpriteDrawer } from 'engine';

export class SpriteDrawerImpl implements SpriteDrawer {
    private playerContainer: HTMLElement;
    private enemyContainer: HTMLElement;

    constructor() {
        this.playerContainer = document.getElementById('players');
        this.enemyContainer = document.getElementById('enemies');
    }

    draw(element: HTMLElement, config: CharacterConfig): void {
        if (config.player) {
            this.playerContainer.appendChild(element);
        } else {
            this.enemyContainer.appendChild(element);
        }
    }
}
