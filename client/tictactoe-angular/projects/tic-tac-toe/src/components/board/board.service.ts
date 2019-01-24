import { Injectable } from '@angular/core';

import { range } from 'underscore';

@Injectable({
    providedIn: "root"
})
export class BoardService {

    private _state: [];
    get state() {
        return this._state;
    }

    static BOARD_DIM = 3;
    static BOARD_SIZE = BoardService.BOARD_DIM * BoardService.BOARD_DIM;

    // constructor

    constructor() {

        this._state = range(BoardService.BOARD_SIZE).map(() => { return 0; });
    }
}
