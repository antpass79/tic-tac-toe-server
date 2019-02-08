import { Side } from "./board.state";

export interface GameState {

    readonly started: boolean;
    readonly busy: boolean;
    readonly winner: Side;
}

export const initialGameState: GameState = {

    started: false,
    busy: false,
    winner: Side.EMPTY
}

export function getInitialGameState(): GameState {
    return initialGameState;
}