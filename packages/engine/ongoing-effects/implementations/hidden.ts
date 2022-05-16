import { Skill } from '../../commands';
import { Character } from '../../characters';
import { OngoingEffectType } from '../ongoing-effect.interface';

export function isHiding(character: Character): boolean;
export function isHiding(skill: Skill): boolean;
export function isHiding(characterOrSkill: Character | Skill): boolean {
    if ('current' in characterOrSkill) {
        const character = characterOrSkill;
        return character.current.ongoingEffects?.some(ongoingEffect => ongoingEffect.type === OngoingEffectType.HIDE);
    } else {
        const skill = characterOrSkill;
        return skill.ongoingEffects?.some(ongoingEffect => ongoingEffect.type === OngoingEffectType.HIDE);
    }
}