import { Character, Hider, SpriteHelper, Test } from 'engine';
import * as React from 'react';

import { HiderSprite } from './sprites/implementations';
import { Sprite, SpriteElement } from './sprites/sprite';

export class SpriteHelperImpl implements SpriteHelper<SpriteElement> {
    get(character: Character): SpriteElement {
        switch (character.constructor) {
            case Hider:
            case Test:
                let resolve;
                const doneDrawing = new Promise<void>(r => resolve = r);

                const sprite: Sprite = {
                    doneDrawing,
                    resolve,
                    character,
                    avatar: React.createRef(),
                    hitpoints: React.createRef(),
                };

                return {
                    sprite,
                    reactElement: <HiderSprite {...sprite} />,
                };
        }
    }
}
