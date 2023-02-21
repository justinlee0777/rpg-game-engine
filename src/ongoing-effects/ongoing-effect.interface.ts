import { Character } from '../characters';

export enum OngoingEffectTriggerType {
    IMMEDIATE = 'Immediate',
}

export interface ImmediateOngoingEffectTrigger {
    type: OngoingEffectTriggerType.IMMEDIATE;
}

export type OngoingEffectTrigger = ImmediateOngoingEffectTrigger;

export interface OngoingEffect {
    /** For the @see {@link OngoingEffectCalculator}. */
    type: string;

    turnDuration: number;

    /** For the @see {@link CommandCalculator}. */
    trigger: OngoingEffectTrigger;

    /**
     * @param target to apply effect on. For example, multiple applications of the effect may differ depending on the character's state.
     */
    apply: (target: Character) => OngoingEffect;

    changeDamage?: (damage: number) => number;

    /**
     * Characters are provided in case multiple stacks of the effect change the damage.
     */
    causeDamage?: {
        startOfTurn?: (target: Character) => number;
        endOfTurn?: (target: Character) => number;
    };
}
