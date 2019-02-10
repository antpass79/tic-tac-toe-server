import { createSelector } from "@ngrx/store";
import { GameState } from "../states/game.state";
import { AppState } from "../states/app.state";

const selectGameState = (state: AppState) => state.game;

export const listenForStarted = createSelector(
    selectGameState,
    (state: GameState) => state.started
);

export const listenForBusy = createSelector(
    selectGameState,
    (state: GameState) => state.busy
);

export const listenForWinner = createSelector(
    selectGameState,
    (state: GameState) => state.winner
);

export const listenForTrainingGames = createSelector(
    selectGameState,
    (state: GameState) => state.trainingGames
);
