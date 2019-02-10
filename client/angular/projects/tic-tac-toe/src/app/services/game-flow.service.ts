import { Injectable } from '@angular/core';
import { GameResult, Board } from '../game/board';
import { AgentProxyService } from './agent-proxy.service';
import { IPlayer } from '../game/players/player';
import { Match } from '../game/match';
import { AppState } from '../store/states/app.state';
import { Store, select } from '@ngrx/store';
import { Busy, Start, Stop, TheWinnerIs } from '../store/actions/game.actions';
import { listenForStarted, listenForBusy, listenForWinner, listenForTrainingGames } from '../store/selectors/game.selector';
import { CellState, Side } from '../store/states/board.state';
import { Move, Reset } from '../store/actions/board.actions';
import { BoardUtils } from '../game/utils';

@Injectable({
    providedIn: 'root'
})
export class GameFlowService {

    // data members

    private _match: Match;
    private _roundChangeSubscriber;

    // constructor

    constructor(
        private store: Store<AppState>,
        private agentProxyService: AgentProxyService) {

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

    listenForTrainingGames() {
        return this.store.pipe(select(listenForTrainingGames));
    }

    async nickname(nickname: string): Promise<string> {

        return new Promise<string>((resolve, reject) => {

            this.store.dispatch(new Busy(true));

            this.agentProxyService.nickname(nickname).subscribe((nickname) => {
                this.store.dispatch(new Busy(false));
                resolve(nickname);
            },
            (error) => {
                this.store.dispatch(new Busy(false));
                reject(error);
            });
        });
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

    async train(games: number): Promise<any> {

        return new Promise<any>((resolve) => {

            this.store.dispatch(new Busy(true));

            this.agentProxyService.train(games).subscribe((statistics) => {

                this.store.dispatch(new Busy(false));
                resolve(statistics);
            });
        });
    }

    async clean(): Promise<any> {

        return new Promise<any>((resolve) => {

            this.store.dispatch(new Busy(true));

            this.agentProxyService.clean().subscribe(() => {

                this.store.dispatch(new Busy(false));
                resolve();
            });
        });
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
        this.store.dispatch(new Reset());
        this.store.dispatch(new Start());
    }

    private stop() {
        this.store.dispatch(new Stop());
    }
}
