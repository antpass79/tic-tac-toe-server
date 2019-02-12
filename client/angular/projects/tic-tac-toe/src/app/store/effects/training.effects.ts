import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, catchError, tap, finalize } from "rxjs/operators";

import { AgentProxyService } from "../../services/agent-proxy.service";
import { TrainingSuccess, TrainingFailure, Training, TrainingActionTypes, Clean, CleanSuccess, CleanFailure } from "../actions/training.actions";
import { Statistics } from "../states/training.state";
import { Busy } from "../actions/game.actions";
import { AppState } from "../states/app.state";
import { Store } from "@ngrx/store";

@Injectable()
export class TrainingEffects {

    constructor(
        private agentProxyService: AgentProxyService,
        private actions$: Actions,
        private store: Store<AppState>
    ) { }

    @Effect()
    training$ = this.actions$
        .pipe(
            ofType(TrainingActionTypes.Training),
            tap(() => this.store.dispatch(new Busy(true))), // don't use store
            map((action: Training) => action.payload),
            switchMap(payload => {

                return this.agentProxyService.train(payload)
                    .pipe(
                        map((data: any) => {

                            let json = JSON.parse(data);
                            let statistics: Statistics = {
                                simulationGames: json.games,
                                crossCount: json.cross_count,
                                naughtCount: json.naught_count,
                                drawCount: json.draw_count
                            };

                            return new TrainingSuccess(statistics);
                        }),
                        catchError((error) => {
                            return of(new TrainingFailure(error));
                        }),
                        finalize(() => {
                            this.store.dispatch(new Busy(false)); // don't use store
                        }));
            }));

    @Effect()
    clean$ = this.actions$
        .pipe(
            ofType(TrainingActionTypes.Clean),
            tap(() => this.store.dispatch(new Busy(true))), // don't use store
            map((action: Clean) => action),
            switchMap(() => {

                return this.agentProxyService.clean()
                    .pipe(
                        map(() => {
                            return new CleanSuccess();
                        }),
                        catchError((error) => {
                            return of(new CleanFailure(error));
                        }),
                        finalize(() => {
                            this.store.dispatch(new Busy(false)); // don't use store
                        }));
            }));
}