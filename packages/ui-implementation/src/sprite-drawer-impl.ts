import { CharacterConfig, SpriteDrawer } from 'engine';
import { Root, createRoot } from 'react-dom/client';

import { Sprite } from './sprites/sprite';

export class SpriteDrawerImpl implements SpriteDrawer<Sprite> {
    private playerContainer: Root;
    private enemyContainer: Root;

    constructor() {
        this.playerContainer = createRoot(
            document.getElementById('players')
        );
        this.enemyContainer = createRoot(
            document.getElementById('enemies')
        );
    }

    draw(element: Sprite, config: CharacterConfig): void {
        if (config.player) {
            this.playerContainer.render(element.jsxElement);
        } else {
            this.enemyContainer.render(element.jsxElement);
        }
    }
}
