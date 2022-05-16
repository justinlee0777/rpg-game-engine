import { OngoingEffect } from 'packages/engine/ongoing-effects';
import { Effect, EffectReaction } from '../../action-coordinator';
import { Character } from '../../characters';
import { SkillType } from '../../commands/skills/skill-type';

import { Animation } from './animation.interface';
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

    /**
     * @returns the animation when characters regenerate stamina at the end of the turn.
     */
    animateStaminaRegen(character: Character, newStamina: number): Animation;

    /**
     * @returns an animation when ongoing effects are removed from characters.
     */
    animateStatusEffectRemoval(character: Character, removedEffects: Array<OngoingEffect>): Animation;
}