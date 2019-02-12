export interface Statistics {
    simulationGames: number;
    crossCount: number;
    naughtCount: number;
    drawCount: number;
}

export interface TrainingState {

    readonly simulationGames: number;
    readonly statistics: Statistics;
    readonly errorMessage: string;
}

export const initialTrainingState: TrainingState = {

    simulationGames: 0,
    statistics: {
        simulationGames: 0,
        crossCount: 0,
        naughtCount: 0,
        drawCount: 0
    },
    errorMessage: null
}

export function getInitialTrainingState(): TrainingState {
    return initialTrainingState;
}