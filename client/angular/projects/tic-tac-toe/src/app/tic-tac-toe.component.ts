import { Component, EventEmitter } from '@angular/core';
import { Match } from '../game/match';
import { CellState, Side } from '../redux/implementation/states';
import { HumanPlayer } from '../game/players/human-player';
import { RandomPlayer } from '../game/players/random-player';

@Component({
    selector: 'tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {

    private _busy: boolean = false;
    get busy(): boolean {
        return this._busy;
    }

    private _winner: Side = Side.EMPTY;
    get winner(): Side {
        return this._winner;
    }

    private _match: Match;
    private _humanPlayer: HumanPlayer;
    private _agentPlayer: RandomPlayer;

    private _cellClick: EventEmitter<CellState> = new EventEmitter<CellState>();

    // Constructor

    constructor() {

        this._match = new Match();
        this._humanPlayer = new HumanPlayer(this._cellClick);
        this._agentPlayer = new RandomPlayer();
    }

    onCellClick(cellState: CellState) {
        this._cellClick.emit(cellState);
    }

    onStartHuman(event) {

        this.reset();

        this._match.play(this._humanPlayer, this._agentPlayer).then((result) => {
            this.updateWinner(result);
        });
    }

    onStartAgent(event) {        

        this.reset();

        this._match.play(this._agentPlayer, this._humanPlayer).then((result) => {
            this.updateWinner(result);
        });
    }

    private updateWinner(statistics: { crossCount: number, naughtCount: number, drawCount: number }) {

        if (statistics.crossCount) {
            this._winner = Side.CROSS;
        }
        else if (statistics.naughtCount) {
            this._winner = Side.NAUGHT;
        }
        else {
            this._winner = Side.EMPTY;
        }
    }

    private reset() {
        this._winner = Side.EMPTY;
    }
}
