import { Priority } from './priority';
import { Skill } from './skills';

/**
 * Properties for all commands.
 */
export interface BaseCommand {
    /**
     * All commands need priority for the game engine to create the flow of action.
     */
    priority: Priority;

    /** Stamina usage for command. */
    stamina: number;
}

/**
 * Unique identifier for commands.
 * Maybe there will be an Item command? Perhaps will not need this in the future.
 */
export enum CommandType {
    SKILL = 'SKILL',
}

export type Command = Skill;
