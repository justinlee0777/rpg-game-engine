import { Character, CharacterType, SkillAnimation } from 'engine';

import { CharacterSpriteMapInstance } from '../character-sprite-map-impl';

export function attackAnimation(source: Character): SkillAnimation {
    return {
        beforeEffect: () => Promise.resolve(),
        runEffect: () => {
            const sprite = CharacterSpriteMapInstance.get(source.constructor as CharacterType);
            const animation = sprite.animate([
                { transform: 'rotate(360deg)' },
            ], {
                duration: 600,
                iterations: 1,
            });

            return animation.finished.then();
        },
        afterEffect: () => Promise.resolve(),
    };
}