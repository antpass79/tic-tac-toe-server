import { CellSign, CellState } from "./states";

// GAME STATE

export const GAME_STATE_ROBOT_IS_THINKING: string = "GAME_STATE_ROBOT_IS_THINKING";
export const GAME_STATE_THE_WINNER_IS: string = "GAME_STATE_THE_WINNER_IS";
export const GAME_STATE_START: string = "GAME_STATE_START";

export const GRID_STATE_IS_ENDED: string = "GRID_STATE_IS_ENDED";

export class MessageActions {

    protected static commonMessage(action) {
        return Object.assign({}, action, { bypassIfEqual: true });
    }
}

export class GameStateMessageActions extends MessageActions {

    static gameStateStartMessage(startPlayer: boolean) {
        return MessageActions.commonMessage({
            type: GAME_STATE_START,
            payload: startPlayer
        });
    }    

    static gameStateRobotIsThinkingMessage(robotIsThinking: boolean) {
        return MessageActions.commonMessage({
            type: GAME_STATE_ROBOT_IS_THINKING,
            payload: robotIsThinking
        });
    }    

    static gameStateTheWinnerIsMessage(winner: CellSign) {
        return MessageActions.commonMessage({
            type: GAME_STATE_THE_WINNER_IS,
            payload: winner
        });
    }    
}

// CELL STATE

export const CELL_STATE_MAKE_MOVE: string = "CELL_STATE_MAKE_MOVE";

export class CellStateMessageActions extends MessageActions {

    static cellStateMakeMoveMessage(cell: CellState) {
        return MessageActions.commonMessage({
            type: CELL_STATE_MAKE_MOVE,
            payload: cell
        });
    }
}
