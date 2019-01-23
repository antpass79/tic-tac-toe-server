import { IReducer, IAction } from "../reducer";
import { GameState, CellState, initialState } from "./states";
import {
    GAME_STATE_START,
    GAME_STATE_ROBOT_IS_THINKING,
    GAME_STATE_THE_WINNER_IS,
    CELL_STATE_MAKE_MOVE,
} from "./actions";

export class GameReducer implements IReducer<GameState> {

    // constructor

    constructor() {
    }

    // public functions

    buildState(state: GameState, action: IAction): GameState {

        switch (action.type) {

            // GAME_STATE

            case GAME_STATE_START: {
                return { ...initialState, started: true, startPlayer: action.payload, isHumanPlayerRound: action.payload };
            }
            case GAME_STATE_ROBOT_IS_THINKING: {
                return { ...state, robotIsThinking: action.payload };
            }
            case GAME_STATE_THE_WINNER_IS: {
                return { ...state, winner: action.payload, started: false };
            }

            // CELL_STATE

            case CELL_STATE_MAKE_MOVE: {
                const updatedCells = state.gridState.cells.map(item => {
                    if (item.x == action.payload.x && item.y == action.payload.y) {
                        return { ...item, ...action.payload }
                    }
                    return item;
                });

                let gridState = { ...state.gridState, cells: updatedCells };
                return { ...state, gridState: gridState, isHumanPlayerRound: !state.isHumanPlayerRound };
            }

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

            case CELL_STATE_MAKE_MOVE:
                return Object.assign({}, state, { sign: action.payload });

            default:
                return state;
        }
    }
}
