import { Action } from 'action-coordinator';
import { AI } from 'ai';

export interface ListenForUserInput {
    (enemyAi: AI): Promise<Array<Action>>;
}
