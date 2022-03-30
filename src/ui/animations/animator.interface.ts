import { Character } from 'characters';
import { SkillType } from 'commands/skills/skill-type';

import { SkillAnimation } from './skill-animation.interface';

/**
 * Contract for animating actions.
 */
export interface Animator {
    /**
     * @returns the necessary animations for skills.
     */
    animateSkill(type: SkillType, sources: Array<Character>): SkillAnimation;
}