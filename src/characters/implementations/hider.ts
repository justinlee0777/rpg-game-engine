import { Command } from 'commands';
import { Attack } from 'commands/implementations';

import { Character, Stats } from '../character.interface'

export class Hider implements Character {
    readonly initial: Readonly<Stats>;
    readonly commands: Array<Command>;

    current: Stats;

    constructor(
        // temp
        public readonly element: HTMLElement
    ) {
        this.initial = {
            health: 50,
        };
        this.current = { ...this.initial };
        this.commands = [new Attack()];
    }
}
