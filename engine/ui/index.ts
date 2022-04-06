/**
 * This directory contains only contracts for implementations of UI-only logic.
 * This is to decouple the UI from the game logic.
 */

import { CharacterType } from '../characters/implementations';

import { Animator } from './animations';
import { SpriteDrawer } from './sprites/sprite-drawer.interface';
import { SpriteHelper } from './sprites/sprite-helper.interface';
import { ListenForUserInput } from './ui-input/ui-input.interface';

export * from './animations';

export * from './sprites/sprite-drawer.interface';

export * from './sprites/sprite-helper.interface';

export * from './ui-input/ui-input.interface';

export interface UIImplementation {
    Animator: Animator;

    CharacterSpriteMap: Map<CharacterType, HTMLElement>;

    SpriteDrawer: SpriteDrawer;

    SpriteHelper: SpriteHelper;

    listenForUserInput: ListenForUserInput;
}