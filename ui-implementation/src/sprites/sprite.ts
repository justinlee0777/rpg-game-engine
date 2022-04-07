import * as React from 'react';

export interface Sprite {
    /** Entire graphical representation of character including data. */
    jsxElement: React.ReactElement;
    /** Graphical representation of character. */
    avatar: React.RefObject<HTMLElement>;
    /** Graphical representation of hitpoints. */
    hitpoints: React.RefObject<HTMLElement>;
}