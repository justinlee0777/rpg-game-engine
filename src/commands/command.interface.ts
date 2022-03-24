import { Priority } from './priority';
import { Skill } from './skills';

export interface Animation {
    (): Promise<void>;
}

export interface BaseCommand {
    priority: Priority;

    animation: {
        // Animator should be a separate service in "ui".
        beforeEffect: Animation;
        runEffect: Animation;
        afterEffect: Animation;
    };
}

export enum CommandType {
    SKILL = 'SKILL',
}

export type Command = Skill;
