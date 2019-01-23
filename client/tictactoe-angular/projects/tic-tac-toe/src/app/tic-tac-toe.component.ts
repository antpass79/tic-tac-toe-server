import { Component, Inject } from '@angular/core';
import { GameState, CellState, CellSign } from '../redux/implementation/states';
import { Store } from '../redux/store';
import { GameStore } from '../redux/implementation/providers';
import { GameStateMessageActions, CellStateMessageActions } from '../redux/implementation/actions';
import { GameFlowService } from '../services/game-flow.service';

@Component({
    selector: 'tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {

    // data members

    isBusy$;
    winner$;

    // Constructor

    constructor(private gameFlowService: GameFlowService) {

        this.isBusy$ = this.gameFlowService.listenRobotIsThinking();
        this.winner$ = this.gameFlowService.listenWinner();
    }

    // public functions

    onStartPlayer(event) {

        this.gameFlowService.start(true);
    }

    onStartRobot(event) {

        this.gameFlowService.start(false);
    }

    onCellClick(cell: CellState) {

        if (!this.gameFlowService.isHumanPlayerRound() || !this.gameFlowService.isStarted() || cell.sign != CellSign.none)
            return;

        this.gameFlowService.makeMovePlayer(cell);
    }
}
