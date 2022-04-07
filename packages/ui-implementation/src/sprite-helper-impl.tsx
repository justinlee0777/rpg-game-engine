import { Character, Hider, SpriteHelper, Test } from 'engine';

import { HiderSprite } from './sprites/implementations';
import { Sprite } from './sprites/sprite';

export class SpriteHelperImpl implements SpriteHelper<Sprite> {
    get(character: Character): Sprite {
        switch (character.constructor) {
            case Hider:
            case Test:
                return new HiderSprite(character);
        }
    }
}
