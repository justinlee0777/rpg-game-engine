import { BaseCommand, CommandType } from '../command.interface';
import { OngoingEffect } from '../../ongoing-effects';
import { SkillType } from './skill-type';

/**
 * A skill unique to each character.
 */
export interface Skill extends BaseCommand {
    /**
     * How much damage the skill does to an enemy. Likely optional in the future.
     */
    damage?: number;

    /**
     * Ongoing effects to apply.
     */
    ongoingEffects?: Array<OngoingEffect>;

    /**
     * Differentiates this type from other Commands.
     */
    type: CommandType.SKILL;

    /**
     * Unique identifier for the skill.
     */
    skillType: SkillType;
}
