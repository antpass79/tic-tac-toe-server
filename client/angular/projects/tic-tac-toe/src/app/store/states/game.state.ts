import { Side } from "./board.state";

export interface GameState {

    readonly started: boolean;
    readonly busy: boolean;
    readonly winner: Side;
    readonly nickname: string;
}

export const initialGameState: GameState = {

    started: false,
    busy: false,
    winner: Side.EMPTY,
    nickname: null
}

export function getInitialGameState(): GameState {
    return initialGameState;
}