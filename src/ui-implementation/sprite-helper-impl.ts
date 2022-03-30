import { SpriteHelper } from 'ui';

export class SpriteHelperImpl implements SpriteHelper {
    private elements = [
        () => document.getElementById('dog-icon'),
        () => document.getElementById('enemy-icon')
    ];

    get(): HTMLElement {
        return this.elements.pop()?.();
    }
}

export const SpriteHelperInstance = new SpriteHelperImpl();