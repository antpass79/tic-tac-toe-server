// import { Injectable } from "@angular/core";
// import { Effect, ofType, Actions } from "@ngrx/effects";
// import { of, concat } from "rxjs";
// import { switchMap, map, catchError, tap, finalize } from "rxjs/operators";

// import { AgentProxyService } from "../../services/agent-proxy.service";
// import { CredentialsActionTypes, Nickname, NicknameSuccess, NicknameFailure } from "../actions/credentials.actions";
// import { Busy } from "../actions/game.actions";
// import { AppState } from "../states/app.state";
// import { Store } from "@ngrx/store";
// import { BoardActionTypes, Move } from "../actions/board.actions";

// @Injectable()
// export class BoardEffects {

//     constructor(
//         private agentProxyService: AgentProxyService,
//         private actions$: Actions,
//         private store: Store<AppState>
//     ) { }

//     @Effect()
//     nickname$ = this.actions$
//         .pipe(
//             tap(() => new Busy(true)),
//             ofType(BoardActionTypes.Move),
//             tap(() => this.store.dispatch(new Busy(true))), // don't use store
//             map((action: Move) => action.payload),
//             switchMap(payload => {

//                 return this.agentProxyService.move(payload)
//                     .pipe(
//                         map((nickname) => {
//                             return new NicknameSuccess(nickname);
//                         }),
//                         catchError((error) => {
//                             return of(new NicknameFailure(error));
//                         }),
//                         finalize(() => {
//                             this.store.dispatch(new Busy(false)); // don't use store
//                         }));
//             }));
// }