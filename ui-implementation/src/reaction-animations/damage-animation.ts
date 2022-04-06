import { Character, CharacterType, ReactionAnimation } from 'engine';


import { CharacterSpriteMapInstance } from '../character-sprite-map-impl';

export function damageAnimation(target: Character): ReactionAnimation {
    return () => {
        const element = CharacterSpriteMapInstance.get(target.constructor as CharacterType);

        const animation = element.ref.current.animate([
            { filter: 'saturate(3)' },
            { filter: 'none' },
        ], 333);

        return animation.finished.then();
    };
}