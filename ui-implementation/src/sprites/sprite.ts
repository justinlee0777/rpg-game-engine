import * as React from 'react';

export abstract class Sprite {
    abstract jsxElement: React.ReactElement;
    abstract ref: React.RefObject<any>;
}