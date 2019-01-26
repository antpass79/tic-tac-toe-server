import { Side, CellState } from "./states";

export const NEW_GAME: string = "NEW_GAME";
export const UPDATE_CELL_SIDES: string = "UPDATE_CELL_SIDES";
export const THE_WINNER_IS: string = "THE_WINNER_IS";

export class MessageActions {

    protected static commonMessage(action) {
        return Object.assign({}, action, { bypassIfEqual: true });
    }

    static newGame() {
        return MessageActions.commonMessage({
            type: NEW_GAME
        });
    }    

    static updateCellSides(state: CellState[]) {
        return MessageActions.commonMessage({
            type: UPDATE_CELL_SIDES,
            payload: state
        });
    }    

    static theWinnerIs(winner: Side) {
        return MessageActions.commonMessage({
            type: THE_WINNER_IS,
            payload: winner
        });
    }    
}