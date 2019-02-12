import { Component, EventEmitter } from '@angular/core';
import { HumanPlayer } from './game/players/human-player';
import { Observable } from 'rxjs';
import { AgentPlayer } from './game/players/agent-player';
import { AgentProxyService } from './services/agent-proxy.service';
import { GameFlowService } from './services/game-flow.service';
import { Side, CellState } from './store/states/board.state';
import { Statistics } from './store/states/training.state';

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

    private _nickname$: Observable<string>;
    get nickname(): Observable<string> {
        return this._nickname$;
    }

    private _nicknameErrorMessage$: Observable<string>;
    get nicknameErrorMessage(): Observable<string> {
        return this._nicknameErrorMessage$;
    }

    private _statistics$: Observable<Statistics>;
    get statistics(): Observable<Statistics> {
        return this._statistics$;
    }

    private _trainingErrorMessage$: Observable<string>;
    get trainingErrorMessage(): Observable<string> {
        return this._trainingErrorMessage$;
    }

    private _humanPlayer: HumanPlayer;
    private _agentPlayer: AgentPlayer;

    private _cellClick: EventEmitter<CellState> = new EventEmitter<CellState>();

    firstHuman: boolean = true;

    // Constructor

    constructor(private agentProxyService: AgentProxyService, private gameFlowService: GameFlowService) {

        this._started$ = this.gameFlowService.listenForStarted();
        this._busy$ = this.gameFlowService.listenForBusy();
        this._winner$ = this.gameFlowService.listenForWinner();

        this._statistics$ = this.gameFlowService.listenForStatistics();
        this._trainingErrorMessage$ = this.gameFlowService.listenForTrainingErrorMessage();

        this._nickname$ = this.gameFlowService.listenForNickname();
        this._nicknameErrorMessage$ = this.gameFlowService.listenForNicknameErrorMessage();

        this._humanPlayer = new HumanPlayer(Side.CROSS, this._cellClick);
        this._agentPlayer = new AgentPlayer(Side.NAUGHT, this.agentProxyService);
    }

    onCellClick(cellState: CellState) {
        this._cellClick.emit(cellState);
    }    

    async onNickname(nickname: string) {
        this.gameFlowService.nickname(nickname);
    }

    async onStartHuman() {

        this.firstHuman = true;
        await this.gameFlowService.newGame(this._humanPlayer, this._agentPlayer);
    }

    async onStartAgent() {

        this.firstHuman = false;
        await this.gameFlowService.newGame(this._agentPlayer, this._humanPlayer);
    }

    async onTrainAgent(trainingGames) {

        await this.gameFlowService.training(parseInt(trainingGames));
    }

    async onCleanAgent() {
        
        await this.gameFlowService.clean();

        if (this.firstHuman)
            await this.onStartHuman();
        else
            await this.onStartAgent();
    }
}
