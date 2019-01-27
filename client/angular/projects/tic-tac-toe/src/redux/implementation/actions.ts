import { Side, CellState } from "./states";

export const NEW_GAME: string = "NEW_GAME";
export const MOVE: string = "MOVE";
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
            type: MOVE,
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