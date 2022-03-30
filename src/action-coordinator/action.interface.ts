import { Character } from 'characters';
import { Command } from 'commands';

export interface Action {
    command: Command;

    /** Let's see how this plays out with a list versus just one character. */
    source: Array<Character>;
    targets: Array<Character>;
}
