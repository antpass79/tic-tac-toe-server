import { createSelector } from "@ngrx/store";
import { GameState } from "../../redux/implementation/states";

const selectGameState = (state: GameState) => state;

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
