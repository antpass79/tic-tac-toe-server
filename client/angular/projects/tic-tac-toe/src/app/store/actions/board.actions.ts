import { Action } from "@ngrx/store";
import { CellState } from "../states/board.state";

export enum BoardActionTypes {
    Move = '[Board] Move',
    MoveSuccess = '[Board] Move Success',
    MoveFailure = '[Board] Move Failure',
    Reset = '[Board] Reset'
}

export class Move implements Action {
    public readonly type = BoardActionTypes.Move;
    constructor(public payload: CellState[]) {}
}

export class MoveSuccess implements Action {
    public readonly type = BoardActionTypes.MoveSuccess;
    constructor(public payload: CellState[]) {}
}

export class MoveFailure implements Action {
    public readonly type = BoardActionTypes.MoveFailure;
    constructor(public payload: any) {}
}

export class Reset implements Action {
    public readonly type = BoardActionTypes.Reset;
    constructor() {}
}

export type BoardActions =
    Move |
    MoveSuccess |
    MoveFailure |
    Reset;