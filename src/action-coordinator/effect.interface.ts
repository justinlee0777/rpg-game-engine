/**
 * Effect of an action. Used only to get reactions from a character.
 */
export interface Effect {
    /** Execute the action, causing some effect on the puzzle itself. */
    execute(): void;

    /** Whether the effect is damaging. */
    damaging: boolean;
}
