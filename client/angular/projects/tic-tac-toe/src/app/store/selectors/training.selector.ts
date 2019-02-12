import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { TrainingState } from "../states/training.state";

const selectTrainingState = (state: AppState) => state.training;

export const listenForStatistics = createSelector(
    selectTrainingState,
    (state: TrainingState) => state.statistics
);

export const listenForTrainingErrorMessage = createSelector(
    selectTrainingState,
    (state: TrainingState) => state.errorMessage
);
