import { EventEmitter } from '@angular/core';
import { range } from 'underscore';
import { Side } from '../store/states/board.state';
import { BoardUtils } from './utils';

export enum GameResult {
    NOT_FINISHED = 0,
    NAUGHT_WIN = 1,
    CROSS_WIN = 2,
    DRAW = 3
}

export class Board {

    stateChange: EventEmitter<Array<Side>> = new EventEmitter<Array<Side>>();

    private _state: Array<Side> = new Array<Side>();
    get state() {
        return this._state;
    }

    constructor() {
        this.reset();
    }

    static otherSide(side: Side) {

        if (side == Side.EMPTY)
            throw Error("EMPTY has no 'other side'");

        if (side == Side.CROSS)
            return Side.NAUGHT;

        if (side == Side.NAUGHT)
            return Side.CROSS;

        throw Error(side + " is not a valid side");
    }

    move(position: number, side: Side) {

        if (this.state[position] != Side.EMPTY) {
            throw Error("Invalid move");
        }

        this.state[position] = side;
        this.stateChange.emit(this.state);

        return this.getBoardState();
    }

    getBoardState() {

        if (this.checkWin())
            return { state: this.state, result: this.whoWin() == Side.CROSS ? GameResult.CROSS_WIN : GameResult.NAUGHT_WIN, finished: true };

        if (this.numEmpty() == 0)
            return { state: this.state, result: GameResult.DRAW, finished: true };

        return { state: this.state, result: GameResult.NOT_FINISHED, finished: false };
    }

    isLegal(move: number) {

        return move >= 0 && move < BoardUtils.BOARD_SIZE && this.state[move] == Side.EMPTY;
    }

    randomEmptySpot() {

        let index = Math.floor(Math.random() * this.numEmpty());
        for (let i = 0; i < 9; i++) {
            if (this.state[i] == Side.EMPTY) {
                if (index == 0)
                    return i;
                else
                    index = index - 1;
            }
        }

        return index;
    }

    reset() {
        this._state = range(BoardUtils.BOARD_SIZE).map(() => { return Side.EMPTY; });
    }

    hashValue() {

        let res = 0;

        for (let i = 0; i < BoardUtils.BOARD_SIZE; i++) {
            res *= 3;
            res += this.state[i];
        }

        return res;
    }

    private checkWin(): boolean {

        return this.whoWin() != Side.EMPTY ? true : false;
    }

    private whoWin(): Side {

        let winner = Side.EMPTY;

        // check rows
        for (let index = 0; index < 9; index += 3) {

            let row = this.state.slice(index, index + 3);
            if (row.every(cell => cell == Side.CROSS)) {
                winner = Side.CROSS;
                break;
            }
            if (row.every(cell => cell == Side.NAUGHT)) {
                winner = Side.NAUGHT;
                break;
            }
        }

        // check columns
        for (let index = 0; index < 3; index += 1) {

            if (this.state[index] == Side.CROSS && this.state[index + 3] == Side.CROSS && this.state[index + 6] == Side.CROSS) {
                winner = Side.CROSS;
                break;
            }
            if (this.state[index] == Side.NAUGHT && this.state[index + 3] == Side.NAUGHT && this.state[index + 6] == Side.NAUGHT) {
                winner = Side.NAUGHT;
                break;
            }
        }

        // check diagonals
        if (this.state[0] == Side.CROSS && this.state[4] == Side.CROSS && this.state[8] == Side.CROSS) {
            winner = Side.CROSS;
        }
        if (this.state[0] == Side.NAUGHT && this.state[4] == Side.NAUGHT && this.state[8] == Side.NAUGHT) {
            winner = Side.NAUGHT;
        }
        if (this.state[2] == Side.CROSS && this.state[4] == Side.CROSS && this.state[6] == Side.CROSS) {
            winner = Side.CROSS;
        }
        if (this.state[2] == Side.NAUGHT && this.state[4] == Side.NAUGHT && this.state[6] == Side.NAUGHT) {
            winner = Side.NAUGHT;
        }

        return winner;
    }

    private numEmpty() {
        return this.state.filter(cell => cell == Side.EMPTY).length;
    }

    print() {
        console.log();
        console.log(" " + this.getSign(this.state[0]) + " | " + this.getSign(this.state[1]) + " | " + this.getSign(this.state[2]));
        console.log("----------");
        console.log(" " + this.getSign(this.state[3]) + " | " + this.getSign(this.state[4]) + " | " + this.getSign(this.state[5]));
        console.log("----------");
        console.log(" " + this.getSign(this.state[6]) + " | " + this.getSign(this.state[7]) + " | " + this.getSign(this.state[8]));
        console.log();
    }

    private getSign(move: Side) {
        if (move == Side.CROSS)
            return "X";
        if (move == Side.NAUGHT)
            return "O";

        return " ";
    }
}