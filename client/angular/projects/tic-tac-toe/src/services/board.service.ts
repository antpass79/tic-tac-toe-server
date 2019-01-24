import { Injectable } from '@angular/core';
import { range } from 'underscore';

import { Constants, Side } from '../redux/implementation/states';

@Injectable({
    providedIn: "root"
})
export class BoardService {

    private _state: Side[];
    get state() {
        return this._state;
    }

    // constructor

    constructor() {

        this._state = range(Constants.BOARD_SIZE).map(() => { return Side.EMPTY; });
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
