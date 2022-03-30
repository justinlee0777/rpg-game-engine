import { Action } from 'action-coordinator';
import { AI } from 'ai';
import { Character } from 'characters';

export interface ListenForUserInput {
    (players: Array<Character>, enemyAi: AI): Promise<Array<Action>>;
}
