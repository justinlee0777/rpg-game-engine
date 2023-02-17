import { OngoingEffect } from '../ongoing-effects/index';
import { Priority } from './priority';

/**
 * Properties for all commands.
 */
export interface Command {
    /**
     * All commands need priority for the game engine to create the flow of action.
     */
    priority: Priority;

    /** Stamina usage for command. */
    stamina: number;

    type: string;

    /**
     * How much damage the skill does to an enemy. Likely optional in the future.
     */
    damage?: number;

    /**
     * Ongoing effects to apply.
     */
    ongoingEffects?: Array<OngoingEffect>;
}
