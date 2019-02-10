import { Side } from "./board.state";

export interface GameState {

    readonly started: boolean;
    readonly busy: boolean;
    readonly winner: Side;
    readonly trainingGames: number;
}

export const initialGameState: GameState = {

    started: false,
    busy: false,
    winner: Side.EMPTY,
    trainingGames: 10000
}

export function getInitialGameState(): GameState {
    return initialGameState;
}