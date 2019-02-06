import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GameResult, Board } from '../game/board';
import { AgentProxyService } from './agent-proxy.service';
import { IPlayer, Side } from '../game/players/player';
import { Match } from '../game/match';
import { MessageActions } from '../redux/implementation/actions';
import { GameState, CellState } from '../redux/implementation/states';
import { Store } from '../redux/store';
import { GameStore } from '../redux/implementation/providers';

@Injectable({
    providedIn: 'root'
})
export class GameFlowService {

    // data members

    private _match: Match;
    private _roundChangeSubscriber;

    // constructor

    constructor(
        @Inject(GameStore) private store: Store<GameState>,
        private agentProxyService: AgentProxyService) {

        this._match = new Match();
        this._match.board.stateChange.subscribe((state: Side[]) => {

            let cellStates: Array<CellState> = state.map((item, index) => {

                let coordinate = Board.getCoordinate(index);

                return {
                    x: coordinate.x,
                    y: coordinate.y,
                    side: item
                }
            });

            this.store.dispatch(MessageActions.updateCellSides(cellStates));
        });
    }

    // public functions

    listenForStarted() {
        return this.store.select('started');
    }

    listenForBusy() {
        return this.store.select('busy');
    }

    listenForWinner() {
        return this.store.select('winner');
    }

    async nickname(nickname: string): Promise<string> {

        return new Promise<string>((resolve, reject) => {

            this.store.dispatch(MessageActions.busy(true));

            this.agentProxyService.nickname(nickname).subscribe((nickname) => {
                this.store.dispatch(MessageActions.busy(false));
                resolve(nickname);
            },
            (error) => {
                this.store.dispatch(MessageActions.busy(false));
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
            
            this.store.dispatch(MessageActions.busy(side == Side.NAUGHT));
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

            this.store.dispatch(MessageActions.busy(true));

            this.agentProxyService.train(games).subscribe((statistics) => {

                this.store.dispatch(MessageActions.busy(false));
                resolve(statistics);
            });
        });
    }

    async clean(): Promise<any> {

        return new Promise<any>((resolve) => {

            this.store.dispatch(MessageActions.busy(true));

            this.agentProxyService.clean().subscribe(() => {

                this.store.dispatch(MessageActions.busy(false));
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

        this.store.dispatch(MessageActions.theWinnerIs(winner));
    }

    private start() {
        this.store.dispatch(MessageActions.start());
    }

    private stop() {
        this.store.dispatch(MessageActions.stop());
    }
}
