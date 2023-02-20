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

    changeDamage?: (damage: number) => number;
}
