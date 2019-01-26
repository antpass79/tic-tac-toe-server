import { IReducer, IAction } from "../reducer";
import { GameState, initialState } from "./states";
import { THE_WINNER_IS, UPDATE_CELL_SIDES, NEW_GAME } from "./actions";

export class GameReducer implements IReducer<GameState> {

    // constructor

    constructor() {
    }

    // public functions

    buildState(state: GameState, action: IAction): GameState {

        switch (action.type) {

            case NEW_GAME: {
                return initialState;
            }

            case UPDATE_CELL_SIDES: {
                let boardState = { ...state.boardState, cells: action.payload };
                return { ...state, boardState: boardState };
            }

            case THE_WINNER_IS: {
                return { ...state, winner: action.payload };
            }

            default:
                return state;
        }
    }
}