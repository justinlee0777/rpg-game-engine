import { Command } from 'commands';

export interface ListenForUserInput {
    (): Promise<Array<Command>>;
}
