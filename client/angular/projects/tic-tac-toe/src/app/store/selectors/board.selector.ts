import { createSelector } from "@ngrx/store";
import { BoardState } from "../states/board.state";
import { AppState } from "../states/app.state";

const selectBoardState = (state: AppState) => state.board;

export const listenForCells = createSelector(
    selectBoardState,
    (state: BoardState) => state.cells
);