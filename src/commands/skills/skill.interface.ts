import { BaseCommand, CommandType } from '../command.interface';

export interface Skill extends BaseCommand {
    displayName: string;
    description: string;

    damage: number;

    type: CommandType.SKILL;
}