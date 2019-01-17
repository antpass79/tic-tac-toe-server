import { GameResult, Board } from '../board';

export enum Side {

    EMPTY = 0,
    CROSS = 1,
    NAUGHT = 2
}

export interface IPlayer {

    newGame(side: Side): void;
    move(board: Board): { gameResult: GameResult, finished: boolean };
    end(gameResult: GameResult): void;
}

export abstract class Player implements IPlayer {

    protected _side: Side = Side.EMPTY;
    get side() {
        return this._side;
    }

    newGame(side: Side): void {
        this._side = side;
    }

    abstract move(board: Board): {gameResult: GameResult, finished: boolean};

    end(gameResult: GameResult): void {
    }
}