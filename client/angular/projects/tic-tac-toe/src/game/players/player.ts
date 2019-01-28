import { GameResult, Board } from '../board';
import { Observable, observable } from 'rxjs';

export enum Side {

    EMPTY = 0,
    NAUGHT = 1,
    CROSS = 2
}

export interface IPlayer {

    newGame(side: Side): Observable<Side>;
    move(board: Board): Observable<{ gameResult: GameResult, finished: boolean }>;
    endGame(gameResult: GameResult): void;
}

export abstract class Player implements IPlayer {

    protected _side: Side = Side.EMPTY;
    get side() {
        return this._side;
    }

    newGame(side: Side): Observable<Side> {
        this._side = side;

        return new Observable<any>((subscriber) => {

            subscriber.next(this._side);
            subscriber.complete();
        });
    }

    abstract move(board: Board): Observable<{gameResult: GameResult, finished: boolean}>;

    endGame(gameResult: GameResult): Observable<GameResult> {

        return new Observable<GameResult>((subscriber) => {

            subscriber.next(gameResult);
            subscriber.complete();
        });
    }
}