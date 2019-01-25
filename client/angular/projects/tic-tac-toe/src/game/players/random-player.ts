import { Player } from './player';
import { GameResult, Board } from '../board';
import { Observable } from 'rxjs';

export class RandomPlayer extends Player {

    move(board: Board): Observable<{ gameResult: GameResult, finished: boolean }> {

        return new Observable((subscriber) => {

            let moveResult = board.move(board.randomEmptySpot(), this.side);
            let result = { gameResult: moveResult.result, finished: moveResult.finished };
     
            subscriber.next(result);
            subscriber.complete();
        });
    }
}