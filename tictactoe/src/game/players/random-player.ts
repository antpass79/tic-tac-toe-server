import { Player } from './player';
import { GameResult, Board } from '../board';

export class RandomPlayer extends Player {

    move(board: Board): {gameResult: GameResult, finished: boolean} {

        let moveResult = board.move(board.randomEmptySpot(), this.side);
        return { gameResult: moveResult.result, finished: moveResult.finished };
    }
}