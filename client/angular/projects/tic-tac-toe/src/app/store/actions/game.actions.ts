import { Action } from "@ngrx/store";
import { Side } from "../states/board.state";

export const START: string = "START";
export const STOP: string = "STOP";
export const THE_WINNER_IS: string = "THE_WINNER_IS";
export const BUSY: string = "BUSY";

export enum GameActionTypes {
    Start = '[Game] Start',
    Stop = '[Game] Stop',
    TheWinnerIs = '[Game] The winner is',
    Busy = '[Game] Busy'
}

export class Start implements Action {
    public readonly type = GameActionTypes.Start;
}

export class Stop implements Action {
    public readonly type = GameActionTypes.Stop;
}
export class TheWinnerIs implements Action {
    public readonly type = GameActionTypes.TheWinnerIs;
    constructor(public payload: Side) {}
}

export class Busy implements Action {
    public readonly type = GameActionTypes.Busy;
    constructor(public payload: boolean) {}
}

export type GameActions =
    Start |
    Stop |
    TheWinnerIs |
    Busy;