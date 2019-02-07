import { initialGameState, GameState } from "../states/game.state";
import { GameActions, GameActionTypes } from "../actions/game.actions";

export const gameReducer = (
    state = initialGameState,
    action: GameActions
): GameState => {

    switch (action.type) {
        case GameActionTypes.Start: {
            return {
                ...state, started: true
            };
        }
        case GameActionTypes.Stop: {
            return {
                ...state, started: false
            };
        }
        case GameActionTypes.Move: {
            let boardState = { ...state.boardState, cells: action.payload };
            return {
                ...state, boardState: boardState
            };
        }
        case GameActionTypes.TheWinnerIs: {
            return {
                ...state, winner: action.payload
            };
        }
        case GameActionTypes.Busy: {
            return {
                ...state, busy: action.payload
            };
        }

        default:
            return state;
    }
}