import { Effect, EffectReaction } from 'action-coordinator';
import { Character } from 'characters';
import { SkillType } from 'commands/skills/skill-type';
import { Animator } from 'ui';
import { Animation, SkillAnimation } from 'ui/animations';
import { damageAnimation } from './reaction-animations/damage-animation';

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

    animateReaction(effect: Effect, reaction: EffectReaction, targets: Array<Character>): Animation {
        if (reaction.foiled) {
            // TODO implement when implementing a foiling skill.
        }

        if (effect.damaging) {
            return () => Promise.all([
                ...targets.map(target => damageAnimation(target)()),
            ]).then();
        }
        return () => Promise.resolve();
    }
}

export const AnimatorInstance = new AnimatorImpl();
