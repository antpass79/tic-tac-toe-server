import { IReducer, IAction } from "../reducer";
import { GameState, CellState } from "./states";

export class GameReducer implements IReducer<GameState> {

    // constructor

    constructor() {
    }

    // public functions

    buildState(state: GameState, action: IAction): GameState {

        switch (action.type) {


            default:
                return state;
        }
    }
}

export class CellReducer implements IReducer<CellState> {

    // constructor

    constructor() {
    }

    // public functions

    buildState(state: CellState, action: IAction): CellState {

        switch (action.type) {

            default:
                return state;
        }
    }
}
