import { BoardState, initialBoardState } from "./board.state";
import { GameState, initialGameState } from "./game.state";

export interface AppState {
    game: GameState;
    board: BoardState;
}

export const initialAppState: AppState = {
    game: initialGameState,
    board: initialBoardState
}

export function getInitialAppState(): AppState {
    return initialAppState;
}