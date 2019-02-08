import { initialGameState, GameState } from "../states/game.state";
import { GameActions, GameActionTypes } from "../actions/game.actions";

export const gameReducer = (
    state = initialGameState,
    action: GameActions
): GameState => {

    switch (action.type) {
        case GameActionTypes.Start: {
            let initialState = initialGameState;
            return {                
                ...initialState, started: true
            };
        }
        case GameActionTypes.Stop: {
            return {
                ...state, started: false
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