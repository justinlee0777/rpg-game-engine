import { BaseCommand, CommandType } from '../command.interface';
import { SkillType } from './skill-type';

export interface Skill extends BaseCommand {
    displayName: string;
    description: string;

    damage: number;

    type: CommandType.SKILL;
    skillType: SkillType;
}