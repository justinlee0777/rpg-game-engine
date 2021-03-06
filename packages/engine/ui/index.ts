/**
 * This directory contains only contracts for implementations of UI-only logic.
 * This is to decouple the UI from the game logic.
 */
import { Animator } from './animations';

export * from './animations';

export * from './sprites/sprite-drawer.interface';

export * from './sprites/sprite-helper.interface';

export * from './ui-input/ui-input.interface';

export interface UIImplementation {
    Animator: Animator;
}