import { Priority } from './priority';
import { Skill } from './skills';

export interface BaseCommand {
    priority: Priority;
}

export enum CommandType {
    SKILL = 'SKILL',
}

export type Command = Skill;
