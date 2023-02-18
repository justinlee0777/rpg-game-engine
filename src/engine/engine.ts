import { OngoingEffect } from '../ongoing-effects/index';
import { Puzzle } from '../puzzle/index';

import { Action } from './action.interface';
import { CommandCalculator } from './command-calculator';
import {
    ActionEvent,
    EndGameEvent,
    GameEvent,
    GameEventType,
    OngoingEffectEvent,
    StaminaRegenEvent,
} from './game-event.interface';
import { PriorityCalculatorInstance } from './priority-calculator';

/**
 * Represents the "calculation" stage of the game loop. The game takes the user's inputs and determines the flow of action.
 */
export class Engine {
    private commandCalculator: CommandCalculator;

    constructor(private puzzle: Puzzle) {
        this.commandCalculator = new CommandCalculator();
    }

    async getResults(playerActions: Array<Action>): Promise<Array<GameEvent>> {
        return new Promise((resolve) => {
            const enemyActions = this.puzzle.enemies.getActions(this.puzzle);

            // Order the player and the enemy's actions.
            const actions: Array<Action> = PriorityCalculatorInstance.order([
                ...playerActions,
                ...enemyActions,
            ]);

            const events: Array<GameEvent> = [];

            actions.forEach((action) => {
                const effect = this.commandCalculator.calculateEffect(action);
                const reaction = this.commandCalculator.calculateReaction(
                    effect,
                    action.targets
                );

                const actionEvent: ActionEvent = {
                    type: GameEventType.ACTION,
                    event: {
                        action,
                        effect,
                        reaction,
                        execute: () =>
                            this.commandCalculator.executeAction(action),
                    },
                };

                events.push(actionEvent);
            });

            const staminaRegenEvent: StaminaRegenEvent = {
                type: GameEventType.STAMINA_REGEN,
                event: {
                    execute: () => this.regenerateStamina(),
                },
            };

            const endOfTurnEvent: OngoingEffectEvent = {
                type: GameEventType.ONGOING_EFFECT,
                event: {
                    execute: () => this.resolveOngoingEffectsEndOfTurn(),
                },
            };

            resolve([...events, staminaRegenEvent, endOfTurnEvent]);
        });
    }

    /**
     * TODO: This should be incorporated in 'getResults'.
     */
    endGame(): EndGameEvent | null {
        const puzzle = this.puzzle;
        if (
            puzzle.victoryConditions.some((condition) =>
                condition(puzzle.enemies.characters)
            ) ||
            puzzle.loseConditions.some((condition) => condition(puzzle.players))
        ) {
            return { type: GameEventType.END_GAME };
        }

        return null;
    }

    /**
     * Regenerate characters' stamina at the end of the turn.
     */
    private regenerateStamina(): void {
        const { players, enemies } = this.puzzle;
        [...players, ...enemies.characters].forEach((character) => {
            const { stamina, staminaRegen } = character.current;
            const newStamina = Math.min(
                stamina + staminaRegen,
                character.initial.stamina
            );

            character.current.stamina = newStamina;
        });
    }

    private resolveOngoingEffectsEndOfTurn(): void {
        const characters = [
            ...this.puzzle.players,
            ...this.puzzle.enemies.characters,
        ];

        characters.forEach((character) => {
            const ongoingEffects: Array<OngoingEffect> = [];
            const removedEffects: Array<OngoingEffect> = [];

            character.current.ongoingEffects?.forEach((ongoingEffect) => {
                ongoingEffect.turnDuration -= 1;

                if (ongoingEffect.turnDuration > 0) {
                    ongoingEffects.push(ongoingEffect);
                } else {
                    removedEffects.push(ongoingEffect);
                }
            });

            character.current.ongoingEffects = ongoingEffects;
        });
    }
}
