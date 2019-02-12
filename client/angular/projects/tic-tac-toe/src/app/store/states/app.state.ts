import { BoardState, initialBoardState } from "./board.state";
import { GameState, initialGameState } from "./game.state";
import { CredentialsState, initialCredentialsState } from "./credentials.state";
import { TrainingState, initialTrainingState } from "./training.state";

export interface AppState {
    credentials: CredentialsState;
    training: TrainingState;
    game: GameState;
    board: BoardState;    
}

export const initialAppState: AppState = {
    credentials: initialCredentialsState,
    training: initialTrainingState,
    game: initialGameState,
    board: initialBoardState,    
}

export function getInitialAppState(): AppState {
    return initialAppState;
}