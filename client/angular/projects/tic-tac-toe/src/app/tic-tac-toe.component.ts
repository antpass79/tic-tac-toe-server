import { Component, EventEmitter, Inject } from '@angular/core';
import { Match } from '../game/match';
import { CellState, Side, GameState, initialState } from '../redux/implementation/states';
import { HumanPlayer } from '../game/players/human-player';
import { RandomPlayer } from '../game/players/random-player';
import { Store } from '../redux/store';
import { GameStore } from '../redux/implementation/providers';
import { MessageActions } from '../redux/implementation/actions';
import { Observable } from 'rxjs';
import { Board } from '../game/board';
import { AgentPlayer } from '../game/players/agent-player';
import { AgentProxyService } from '../services/agent-proxy.service';
import { GameFlowService } from '../services/game-flow.service';

@Component({
    selector: 'tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {

    gameState: GameState = initialState;

    private _busy$: Observable<boolean>;
    get busy(): Observable<boolean> {
        return this._busy$;
    }

    private _winner$: Observable<Side>;
    get winner(): Observable<Side> {
        return this._winner$;
    }

    private _match: Match;
    private _humanPlayer: HumanPlayer;
    private _agentPlayer: AgentPlayer;

    private _cellClick: EventEmitter<CellState> = new EventEmitter<CellState>();

    // Constructor

    constructor(@Inject(GameStore) private store: Store<GameState>, private agentProxyService: AgentProxyService, private gameFlowService: GameFlowService) {

        this._busy$ = this.store.select('busy');
        this._winner$ = this.store.select('winner');

        this._humanPlayer = new HumanPlayer(this._cellClick);
        this._agentPlayer = new AgentPlayer(this.agentProxyService);
    }

    onCellClick(cellState: CellState) {
        this._cellClick.emit(cellState);
    }    

    async onStartHuman() {

        await this.gameFlowService.newGame(this._humanPlayer, this._agentPlayer);
    }

    async onStartAgent() {

        await this.gameFlowService.newGame(this._agentPlayer, this._humanPlayer);
    }

    async onTrainAgent() {

        await this.gameFlowService.train(100);
    }
}
