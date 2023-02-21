import { Character } from '../characters';
import { OngoingEffect } from '../ongoing-effects/index';
import { Puzzle } from '../puzzle/index';

import { Action } from './action.interface';
import { CommandCalculator } from './command-calculator';
import { GameEvent, GameEventType } from './game-event.interface';
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
            // TOOD: This may need to be placed somewhere else if commands deplete the stamina of others.
            const actions: Array<Action> = this.priorityCalculator.order([
                ...playerActions,
                ...enemyActions,
            ]);

            const [effects, endGame] = this.commandCalculator.calculateChanges(
                this.puzzle,
                actions,
                this.endGame
            );

            const events: Array<GameEvent> = effects.map((effect) => ({
                type: GameEventType.ACTION,
                event: effect,
            }));

            if (!endGame) {
                events.push({
                    type: GameEventType.STAMINA_REGEN,
                    event: {
                        execute: () => this.regenerateStamina(),
                    },
                });

                events.push({
                    type: GameEventType.ONGOING_EFFECT,
                    event: {
                        execute: () =>
                            // TODO: Wait, this needs to be calculated if this ends the game as well. This should all come from the calculator.
                            this.resolveOngoingEffectsEndOfTurn(this.puzzle),
                    },
                });
            }

            resolve(events);
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

    private endGame(puzzle: Puzzle): boolean {
        return (
            puzzle.victoryConditions.some((condition) =>
                condition(puzzle.enemies.characters)
            ) ||
            puzzle.loseConditions.some((condition) => condition(puzzle.players))
        );
    }
}
