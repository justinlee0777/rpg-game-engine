import { Effect, EffectReaction } from '../../action-coordinator';
import { Character } from '../../characters';
import { SkillType } from '../../commands/skills/skill-type';

import { ReactionAnimation } from './reaction-animation.interface';
import { SkillAnimation } from './skill-animation.interface';

/**
 * Contract for animating actions.
 */
export interface Animator {
    /**
     * @returns the necessary animations for skills.
     */
    animateSkill(type: SkillType, sources: Array<Character>): SkillAnimation;

    /**
     * @returns the necessary animation for characters reacting to actions.
     */
    animateReaction(effect: Effect, reaction: EffectReaction, targets: Array<Character>): ReactionAnimation;
}