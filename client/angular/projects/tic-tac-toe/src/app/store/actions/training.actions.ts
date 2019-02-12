import { Action } from "@ngrx/store";
import { Statistics } from "../states/training.state";

export enum TrainingActionTypes {
    Training = '[Training] Train',
    TrainingSuccess = '[Training] Train Success',
    TrainingFailure = '[Training] Train Failure',
    Clean = '[Training] Clean',
    CleanSuccess = '[Training] Clean Success',
    CleanFailure = '[Training] Clean Failure'
}

export class Training implements Action {
    public readonly type = TrainingActionTypes.Training;
    constructor(public payload: number) { }
}

export class TrainingSuccess implements Action {
    public readonly type = TrainingActionTypes.TrainingSuccess;
    constructor(public payload: Statistics) { }
}

export class TrainingFailure implements Action {
    public readonly type = TrainingActionTypes.TrainingFailure;
    constructor(public payload: any) { }
}

export class Clean implements Action {
    public readonly type = TrainingActionTypes.Clean;    
}

export class CleanSuccess implements Action {
    public readonly type = TrainingActionTypes.CleanSuccess;
    constructor() { }
}

export class CleanFailure implements Action {
    public readonly type = TrainingActionTypes.CleanFailure;
    constructor(public payload: any) { }
}

export type TrainingActions =
    Training |
    TrainingSuccess |
    TrainingFailure |
    Clean |
    CleanSuccess |
    CleanFailure;