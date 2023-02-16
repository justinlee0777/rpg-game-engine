/**
 * This directory contains only contracts for implementations of UI-only logic.
 * This is to decouple the UI from the game logic.
 */
import { Animator } from './animations';

export interface UIImplementation {
    Animator: Animator;
}

export * from './animations/index';
