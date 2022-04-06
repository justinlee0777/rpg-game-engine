import { CharacterType } from 'characters/implementations';

/**
 * Contract for fetching the specific UI element for a character.
 */
export interface SpriteHelper {
    /**
     * Create the specific sprite for a specific character.
     * @returns the created sprite
     */
    get(type: CharacterType): HTMLElement;
}