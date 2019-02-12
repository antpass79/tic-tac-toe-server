import { Injectable } from '@angular/core';
import { GameResult } from '../game/board';
import { AgentProxyService } from './agent-proxy.service';
import { IPlayer } from '../game/players/player';
import { Match } from '../game/match';
import { AppState } from '../store/states/app.state';
import { Store, select } from '@ngrx/store';
import { Busy, Start, Stop, TheWinnerIs } from '../store/actions/game.actions';
import { listenForStarted, listenForBusy, listenForWinner } from '../store/selectors/game.selector';
import { listenForStatistics, listenForTrainingErrorMessage } from '../store/selectors/training.selector';
import { CellState, Side } from '../store/states/board.state';
import { Move, Reset } from '../store/actions/board.actions';
import { BoardUtils } from '../game/utils';
import { listenForNickname,listenForNicknameErrorMessage } from '../store/selectors/credentials.selector';
import { Nickname } from '../store/actions/credentials.actions';
import { Training, Clean } from '../store/actions/training.actions';

@Injectable({
    providedIn: 'root'
})
export class GameFlowService {

    // data members

    private _match: Match;
    private _roundChangeSubscriber;

    // constructor

    constructor(
        private store: Store<AppState>) {

        this._match = new Match();
        this._match.board.stateChange.subscribe((state: Side[]) => {

            let cellStates: Array<CellState> = state.map((item, index) => {

                let coordinate = BoardUtils.getCoordinate(index);

                return {
                    x: coordinate.x,
                    y: coordinate.y,
                    side: item
                }
            });

            this.store.dispatch(new Move(cellStates));
        });
    }

    // public functions

    listenForStarted() {
        return this.store.pipe(select(listenForStarted));
    }

    listenForBusy() {
        return this.store.pipe(select(listenForBusy));
    }

    listenForWinner() {
        return this.store.pipe(select(listenForWinner));
    }

    listenForNickname() {
        return this.store.pipe(select(listenForNickname));
    }

    listenForNicknameErrorMessage() {
        return this.store.pipe(select(listenForNicknameErrorMessage));
    }

    listenForStatistics() {
        return this.store.pipe(select(listenForStatistics));
    }

    listenForTrainingErrorMessage() {
        return this.store.pipe(select(listenForTrainingErrorMessage));
    }

    nickname(nickname: string) {
        this.store.dispatch(new Nickname(nickname));
    }

    async newGame(player1: IPlayer, player2: IPlayer): Promise<GameResult> {

        if (this._roundChangeSubscriber) {
            this._roundChangeSubscriber.unsubscribe();
            this._roundChangeSubscriber = null;
        }
        this._roundChangeSubscriber = this._match.roundChange.subscribe((side: Side) => {
            
            this.store.dispatch(new Busy(side == Side.NAUGHT));
        });

        this.start();

        let result = await this._match.game(player1, player2, false);
        this._updateWinner(result);
        this.stop();

        return new Promise<GameResult>((resolve) => {

            resolve(result);
        });
    }

    async training(games: number): Promise<any> {
        this.store.dispatch(new Training(games));
    }

    async clean(): Promise<any> {
        this.store.dispatch(new Clean());
    }

    // private functions

    private _updateWinner(gameResult: GameResult) {

        let winner: Side = Side.EMPTY;

        if (gameResult == GameResult.CROSS_WIN) {
            winner = Side.CROSS;
        }
        else if (gameResult == GameResult.NAUGHT_WIN) {
            winner = Side.NAUGHT;
        }
        else {
            winner = Side.EMPTY;
        }

        this.store.dispatch(new TheWinnerIs(winner));
    }

    private start() {
        this.store.dispatch(new Start());
    }

    private stop() {
        this.store.dispatch(new Stop());
    }
}
