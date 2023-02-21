import { Puzzle } from '../puzzle/index';

import { Action } from './action.interface';
import { CommandCalculator } from './command-calculator';
import { GameEvent } from './game-event.interface';
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

            const effects = this.commandCalculator.calculateChanges(
                this.puzzle,
                actions,
                this.endGame
            );

            const events: Array<GameEvent> = effects.map((effect) => ({
                event: effect,
            }));

            resolve(events);
        });
    }

    orderActions(actions: Array<Action>): Array<Action> {
        return this.priorityCalculator.order(actions);
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
