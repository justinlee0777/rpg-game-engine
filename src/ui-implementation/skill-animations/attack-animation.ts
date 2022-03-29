import { SkillAnimation } from 'ui';

const dogIcon = document.getElementById('dog-icon');

export const attackAnimation: SkillAnimation = {
    beforeEffect: () => Promise.resolve(),
    runEffect: () => {
        const animation = dogIcon.animate([
            { transform: 'rotate(360deg)' },
        ], {
            duration: 600,
            iterations: 1,
        });

        return animation.finished.then();
    },
    afterEffect: () => Promise.resolve(),
};