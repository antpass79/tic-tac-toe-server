import { TrainingActions, TrainingActionTypes } from "../actions/training.actions";
import { initialTrainingState, TrainingState } from "../states/training.state";

export const trainingReducer = (
    state = initialTrainingState,
    action: TrainingActions
): TrainingState => {

    switch (action.type) {
        case TrainingActionTypes.TrainingSuccess: {
            return {
                ...state, statistics: action.payload, errorMessage: null
            };
        }
        case TrainingActionTypes.TrainingFailure: {
            return {
                ...state, simulationGames: 0, errorMessage: 'Error during training'
            };
        }
        case TrainingActionTypes.CleanSuccess: {
            return {
                ...state, statistics: null, errorMessage: null
            };
        }
        case TrainingActionTypes.CleanFailure: {
            return {
                ...state, statistics: null, errorMessage: 'Error during cleaning'
            };
        }

        default:
            return state;
    }
}