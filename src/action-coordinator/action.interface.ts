import { Character } from 'characters';
import { Command } from 'commands';

export interface Action {
    command: Command;

    targets: Array<Character>;
}
