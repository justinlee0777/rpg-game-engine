import { cloneDeep } from 'lodash-es';

import { Character } from '../characters';
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
import { PriorityCalculator } from './priority-calculator';

/**
 * Represents the "calculation" stage of the game loop. The game takes the user's inputs and determines the flow of action.
 */
export class Engine {
    private commandCalculator: CommandCalculator;
    private priorityCalculator: PriorityCalculator;

    constructor(private puzzle: Puzzle) {
        this.commandCalculator = new CommandCalculator();
        this.priorityCalculator = new PriorityCalculator();
    }

    async getResults(playerActions: Array<Action>): Promise<Array<GameEvent>> {
        return new Promise((resolve) => {
            const enemyActions = this.puzzle.enemies.getActions(this.puzzle);

            // Order the player and the enemy's actions.
            const actions: Array<Action> = this.priorityCalculator.order([
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
                    execute: () =>
                        this.resolveOngoingEffectsEndOfTurn(this.puzzle),
                },
            };

            const simulatedGameEvents = this.simulateGame([
                ...events,
                staminaRegenEvent,
                endOfTurnEvent,
            ]);

            resolve(simulatedGameEvents);
        });
    }

    orderActions(actions: Array<Action>): Array<Action> {
        return this.priorityCalculator.order(actions);
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

    private resolveOngoingEffectsEndOfTurn(
        puzzle: Puzzle
    ): Map<Character, Array<OngoingEffect>> {
        const map = new Map();

        const characters = [...puzzle.players, ...puzzle.enemies.characters];

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

            map.set(character, removedEffects);
        });

        return map;
    }

    private endGame(puzzle: Puzzle): EndGameEvent | null {
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
     * Simulate the events on the current puzzle and end the game early if the events are conclusive.
     */
    private simulateGame(events: Array<GameEvent>): Array<GameEvent> {
        const copyPuzzle = cloneDeep(this.puzzle);

        const newEvents = [];

        for (const gameEvent of events) {
            switch (gameEvent.type) {
                case GameEventType.ACTION:
                    const { event } = this.simulateActionEvent(
                        copyPuzzle,
                        gameEvent
                    );
                    event.execute();
                    event.effect.execute();
                    break;
                case GameEventType.ONGOING_EFFECT:
                // TODO
            }

            newEvents.push(gameEvent);

            if (this.endGame(copyPuzzle)) {
                newEvents.push({
                    type: GameEventType.END_GAME,
                });
                break;
            }
        }

        return newEvents;
    }

    private simulateActionEvent(
        puzzle: Puzzle,
        original: ActionEvent
    ): ActionEvent {
        const characters = [...puzzle.players, ...puzzle.enemies.characters];

        const { action } = original.event;

        const newAction: Action = {
            source: action.source.map((character) =>
                characters.find((c) => c.constructor === character.constructor)
            ),
            command: action.command,
            targets: action.targets.map((character) =>
                characters.find((c) => c.constructor === character.constructor)
            ),
        };

        const newEffect = this.commandCalculator.calculateEffect(newAction);
        const newReaction = this.commandCalculator.calculateReaction(
            newEffect,
            newAction.targets
        );

        return {
            type: GameEventType.ACTION,
            event: {
                action: newAction,
                effect: newEffect,
                reaction: newReaction,
                execute: () => this.commandCalculator.executeAction(action),
            },
        };
    }
}
