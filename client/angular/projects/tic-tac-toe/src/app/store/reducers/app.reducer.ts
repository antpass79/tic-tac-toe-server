import { AppState } from "../states/app.state";
import { ActionReducerMap } from "@ngrx/store";
import { gameReducer } from "./game.reducer";
import { boardReducer } from "./board.reducer";

export const appReducer: ActionReducerMap<AppState, any> = {
    game: gameReducer,
    board: boardReducer
}