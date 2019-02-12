import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { of, concat } from "rxjs";
import { switchMap, map, catchError, tap, finalize } from "rxjs/operators";

import { AgentProxyService } from "../../services/agent-proxy.service";
import { CredentialsActionTypes, Nickname, NicknameSuccess, NicknameFailure } from "../actions/credentials.actions";
import { Busy, GameActionTypes } from "../actions/game.actions";
import { AppState } from "../states/app.state";
import { Store } from "@ngrx/store";
import { Reset } from "../actions/board.actions";

@Injectable()
export class GameEffects {

    constructor(        
        private actions$: Actions        
    ) { }

    @Effect()
    start$ = this.actions$
        .pipe(            
            ofType(GameActionTypes.Start),
            map(() => new Reset()));
}