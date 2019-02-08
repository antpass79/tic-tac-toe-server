import { Action } from "@ngrx/store";
import { CellState } from "../states/board.state";

export enum BoardActionTypes {
    Move = '[Board] Move',
    Reset = '[Board] Reset'
}

export class Move implements Action {
    public readonly type = BoardActionTypes.Move;
    constructor(public payload: CellState[]) {}
}

export class Reset implements Action {
    public readonly type = BoardActionTypes.Reset;
    constructor() {}
}

export type BoardActions =
    Move |
    Reset;