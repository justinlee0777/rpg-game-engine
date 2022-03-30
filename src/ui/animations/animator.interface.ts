import { Character } from 'characters';
import { SkillType } from 'commands/skills/skill-type';

import { SkillAnimation } from './skill-animation.interface';

export interface Animator {
    animateSkill(type: SkillType, sources: Array<Character>): SkillAnimation;
}