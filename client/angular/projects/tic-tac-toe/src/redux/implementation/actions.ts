import { Side, CellState } from "./states";

export const START: string = "START";
export const STOP: string = "STOP";
export const MOVE: string = "MOVE";
export const THE_WINNER_IS: string = "THE_WINNER_IS";
export const BUSY: string = "BUSY";

export class MessageActions {

    protected static commonMessage(action) {
        return Object.assign({}, action, { bypassIfEqual: true });
    }

    static start() {
        return MessageActions.commonMessage({
            type: START
        });
    }    

    static stop() {
        return MessageActions.commonMessage({
            type: STOP
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

    static busy(busy: boolean) {
        return MessageActions.commonMessage({
            type: BUSY,
            payload: busy
        });
    }    
}