
export class MessageActions {

    protected static commonMessage(action) {
        return Object.assign({}, action, { bypassIfEqual: true });
    }
}

export class GameStateMessageActions extends MessageActions {
}

// CELL STATE

export const CELL_STATE_MAKE_MOVE: string = "CELL_STATE_MAKE_MOVE";

export class CellStateMessageActions extends MessageActions {

}
