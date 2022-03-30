import { Character } from 'characters';
import { CharacterType } from 'characters/implementations';
import { ReactionAnimation } from 'ui';

import { CharacterSpriteMapInstance } from '../character-sprite-map-impl';

export function damageAnimation(target: Character): ReactionAnimation {
    return () => {
        const element = CharacterSpriteMapInstance.get(target.constructor as CharacterType);

        const animation = element.animate([
            { filter: 'saturate(3)' },
            { filter: 'none' },
        ], 333);

        return animation.finished.then();
    };
}