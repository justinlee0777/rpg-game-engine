import { Character } from 'characters';
import { CharacterType } from 'characters/implementations';
import { SkillAnimation } from 'ui';
import { CharacterSpriteMapInstance } from 'ui-implementation/character-sprite-map-impl';

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