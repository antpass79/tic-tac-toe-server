import { BoardState, initialBoardState } from "../states/board.state";
import { BoardActionTypes, BoardActions } from "../actions/board.actions";

export const boardReducer = (
    state = initialBoardState,
    action: BoardActions
): BoardState => {

    switch (action.type) {
        case BoardActionTypes.Move: {
            return {
                ...state, cells: action.payload
            };
        }
        // case BoardActionTypes.MoveSuccess: {
        //     return {
        //         ...state, cells: action.payload, errorMessage: null
        //     };
        // }
        // case BoardActionTypes.MoveFailure: {
        //     let newState = initialBoardState;
        //     return {
        //         ...newState, errorMessage: "Invalid move"
        //     };
        // }
        case BoardActionTypes.Reset: {
            return initialBoardState;
        }

        default:
            return state;
    }
}