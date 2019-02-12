import { AppState } from "../states/app.state";
import { ActionReducerMap } from "@ngrx/store";
import { gameReducer } from "./game.reducer";
import { boardReducer } from "./board.reducer";
import { credentialsReducer } from "./credentials.reducer";
import { trainingReducer } from "./training.reducer";

export const appReducer: ActionReducerMap<AppState, any> = {
    credentials: credentialsReducer,
    training: trainingReducer,
    game: gameReducer,
    board: boardReducer    
}