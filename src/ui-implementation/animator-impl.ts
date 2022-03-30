import { Character } from 'characters';
import { SkillType } from 'commands/skills/skill-type';
import { Animator } from 'ui';
import { SkillAnimation } from 'ui/animations';

import { attackAnimation } from './skill-animations/attack-animation';

export class AnimatorImpl implements Animator {
    private readonly defaultAnimation: SkillAnimation = {
        beforeEffect: () => Promise.resolve(),
        runEffect: () => Promise.resolve(),
        afterEffect: () => Promise.resolve(),
    };

    animateSkill(type: SkillType, sources: Array<Character>): SkillAnimation {
        switch (type) {
            case SkillType.ATTACK:
                return attackAnimation(sources[0]);
            default:
                return this.defaultAnimation;
        }
    }
}

export const AnimatorInstance = new AnimatorImpl();
