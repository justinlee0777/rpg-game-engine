import { Hider } from './characters';
import { PuzzleImpl } from './puzzle';

new PuzzleImpl({ players: [new Hider()], enemies: [new Hider()] }).run();