import { Character } from 'characters';
import { SkillAnimation } from 'ui';

export function attackAnimation(source: Character): SkillAnimation {
    return {
        beforeEffect: () => Promise.resolve(),
        runEffect: () => {
            const animation = source.element.animate([
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