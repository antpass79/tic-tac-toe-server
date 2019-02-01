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

    private _match: Match = new Match();

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

    async newGame(player1: IPlayer, player2: IPlayer): Promise<GameResult> {

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
