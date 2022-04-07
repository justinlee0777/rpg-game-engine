import { BaseCommand, CommandType } from '../command.interface';
import { SkillType } from './skill-type';

/**
 * A skill unique to each character.
 */
export interface Skill extends BaseCommand {
    /**
     * What to display to the user.
     */
    displayName: string;
    /**
     * Description of the skill to display to the user.
     */
    description: string;

    /**
     * How much damage the skill does to an enemy. Likely optional in the future.
     */
    damage: number;

    /**
     * Differentiates this type from other Commands.
     */
    type: CommandType.SKILL;

    /**
     * Unique identifier for the skill.
     */
    skillType: SkillType;
}