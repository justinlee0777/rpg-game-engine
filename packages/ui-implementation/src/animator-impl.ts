import { Animation, Animator, Character, CharacterType, Effect, EffectReaction, SkillAnimation, SkillType } from 'engine';
import { CharacterSpriteMapInstance } from './character-sprite-map-impl';

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
            case SkillType.FASTER_ATTACK:
            case SkillType.FASTEST_ATTACK:
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

    animateStaminaRegen(character: Character, newStamina: number): Animation {
        const sprite = CharacterSpriteMapInstance.get(character.constructor as CharacterType);
        return () => {
            sprite.stamina.current.textContent = newStamina.toString();
            return Promise.resolve();
        };
    }
}
