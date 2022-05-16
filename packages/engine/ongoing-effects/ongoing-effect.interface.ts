export enum OngoingEffectType {
    HIDE = 'Hide',
}

export enum OngoingEffectTriggerType {
    IMMEDIATE = 'Immediate',
}

export interface ImmediateOngoingEffectTrigger {
    type: OngoingEffectTriggerType.IMMEDIATE;
}

export type OngoingEffectTrigger = ImmediateOngoingEffectTrigger;

export interface OngoingEffect {
    /** For the @see {@link OngoingEffectCalculator}. */
    type: OngoingEffectType;

    turnDuration: number;

    /** For the @see {@link CommandCalculator}. */
    trigger: OngoingEffectTrigger;
}