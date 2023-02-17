import { Command } from '../../commands';
import { Character } from '../../characters/index';
import { OngoingEffectType } from '../ongoing-effect.interface';

export function isHiding(character: Character): boolean;
export function isHiding(command: Command): boolean;
export function isHiding(characterOrCommand: Character | Command): boolean {
    if ('current' in characterOrCommand) {
        const character = characterOrCommand;
        return character.current.ongoingEffects?.some(
            (ongoingEffect) => ongoingEffect.type === OngoingEffectType.HIDE
        );
    } else {
        const skill = characterOrCommand;
        return skill.ongoingEffects?.some(
            (ongoingEffect) => ongoingEffect.type === OngoingEffectType.HIDE
        );
    }
}
