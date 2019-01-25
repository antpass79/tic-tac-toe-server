import { Injectable } from '@angular/core';
import { range } from 'underscore';

import { Constants, Side } from '../redux/implementation/states';
import { Board } from '../game/board';

@Injectable({
    providedIn: "root"
})
export class BoardService {

    private _board: Board;
    get board() {
        return this._board;
    }

    // constructor

    constructor() {
        this._board = new Board();
    }

    static getIndex(x: number, y: number) {
        return x * 3 + y;
    }

    static getCoordinate(index: number): { x: number, y: number } {

        let coordinate = {
            x: Math.floor(index / Constants.BOARD_DIM),
            y: index % Constants.BOARD_DIM
        }

        return coordinate;
    }
}
