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
        case BoardActionTypes.Reset: {
            return initialBoardState;
        }

        default:
            return state;
    }
}