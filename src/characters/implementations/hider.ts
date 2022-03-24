import { Skill } from 'skills';

import { Character, Stats } from '../character.interface'

export class Hider implements Character {
    readonly initial: Readonly<Stats>;
    readonly skills: Array<Skill>;

    current: Stats;

    constructor() {
        this.initial = {
            health: 50,
        };
        this.current = { ...this.initial };
        this.skills = [];
    }

    defeated(): boolean {
        // This will be a common losing condition. Consider putting it into a util.
        return this.current.health <= 0;
    }
}
