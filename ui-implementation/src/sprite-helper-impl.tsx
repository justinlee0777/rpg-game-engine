import { CharacterType, Hider, SpriteHelper, Test } from 'engine';

import { HiderSprite } from './sprites/implementations';
import { Sprite } from './sprites/sprite';

export class SpriteHelperImpl implements SpriteHelper<Sprite> {
    get(type: CharacterType): Sprite {
        switch (type) {
            case Hider:
            case Test:
                return new HiderSprite();
        }
    }
}
