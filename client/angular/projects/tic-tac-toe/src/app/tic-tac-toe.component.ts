import { Component, EventEmitter } from '@angular/core';
import { HumanPlayer } from './game/players/human-player';
import { Observable } from 'rxjs';
import { AgentPlayer } from './game/players/agent-player';
import { AgentProxyService } from './services/agent-proxy.service';
import { GameFlowService } from './services/game-flow.service';
import { Side, CellState } from './store/states/board.state';

class Statistics {

    games: number;
    crossCount: number;
    naughtCount: number;
    drawCount: number;
}

@Component({
    selector: 'tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {

    private _started$: Observable<boolean>;
    get started(): Observable<boolean> {
        return this._started$;
    }

    private _busy$: Observable<boolean>;
    get busy(): Observable<boolean> {
        return this._busy$;
    }

    private _winner$: Observable<Side>;
    get winner(): Observable<Side> {
        return this._winner$;
    }

    private _trainingGames$: Observable<number>;
    get trainingGames(): Observable<number> {
        return this._trainingGames$;
    }

    private _humanPlayer: HumanPlayer;
    private _agentPlayer: AgentPlayer;

    private _cellClick: EventEmitter<CellState> = new EventEmitter<CellState>();

    statistics: Statistics;
    games: number = 10000;
    nickname: string = '';
    validNickname: string = '';
    firstHuman: boolean = true;

    // Constructor

    constructor(private agentProxyService: AgentProxyService, private gameFlowService: GameFlowService) {

        this._started$ = this.gameFlowService.listenForStarted();
        this._busy$ = this.gameFlowService.listenForBusy();
        this._winner$ = this.gameFlowService.listenForWinner();
        this._trainingGames$ = this.gameFlowService.listenForWinner();

        this._humanPlayer = new HumanPlayer(Side.CROSS, this._cellClick);
        this._agentPlayer = new AgentPlayer(Side.NAUGHT, this.agentProxyService);
    }

    onCellClick(cellState: CellState) {
        this._cellClick.emit(cellState);
    }    

    async onNickname() {
        this.gameFlowService.nickname(this.nickname)
            .then(nickname => {
                this.validNickname = nickname;
            }).catch(() => {
                this.validNickname = '';
        });
    }

    async onStartHuman() {

        this.firstHuman = true;
        await this.gameFlowService.newGame(this._humanPlayer, this._agentPlayer);
    }

    async onStartAgent() {

        this.firstHuman = false;
        await this.gameFlowService.newGame(this._agentPlayer, this._humanPlayer);
    }

    async onTrainAgent() {

        let jsonData = await this.gameFlowService.train(this.games);
        let statistics = JSON.parse(jsonData);
        this.statistics = {
            games: statistics.games,
            crossCount: statistics.cross_count,
            naughtCount: statistics.naught_count,
            drawCount: statistics.draw_count
        };
    }

    async onCleanAgent() {
        
        await this.gameFlowService.clean();

        if (this.firstHuman)
            await this.onStartHuman();
        else
            await this.onStartAgent();
    }
}
