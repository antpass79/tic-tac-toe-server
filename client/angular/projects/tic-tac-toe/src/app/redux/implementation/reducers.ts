import { IReducer, IAction } from "../reducer";
import { GameState, initialState } from "./states";
import { THE_WINNER_IS, MOVE, START, STOP, BUSY } from "./actions";

export class GameReducer implements IReducer<GameState> {

    // constructor

    constructor() {
    }

    // public functions

    buildState(state: GameState, action: IAction): GameState {

        switch (action.type) {

            case START: {
                let startState = initialState;
                return { ...startState, started: true };
            }

            case STOP: {                
                return { ...state, started: false };
            }

            case MOVE: {
                let boardState = { ...state.boardState, cells: action.payload };
                return { ...state, boardState: boardState };
            }

            case THE_WINNER_IS: {
                return { ...state, winner: action.payload };
            }

            case BUSY: {
                return { ...state, busy: action.payload };
            }

            default:
                return state;
        }
    }
}