import { Injectable, Inject } from '@angular/core';
import { GameState, CellState, CellSign } from '../redux/implementation/states';
import { Store } from '../redux/store';
import { GameStore } from '../redux/implementation/providers';
import { GameStateMessageActions, CellStateMessageActions } from '../redux/implementation/actions';
import { BaseRobotService } from './robot.service';
import { WinService } from './win.service';

@Injectable({
    providedIn: "root"
})
export class GameFlowService {

    // constructor

    constructor(
        @Inject(GameStore) private store: Store<GameState>,
        private robotService: BaseRobotService,
        private winService: WinService) {
    }

    // public functions

    listenCells() {
        return this.store.select("gridState", "cells");
    }

    listenRobotIsThinking() {
        return this.store.select("robotIsThinking");
    }

    listenWinner() {
        return this.store.select("winner");
    }

    start(startPlayer) {

        this.store.dispatch(GameStateMessageActions.gameStateStartMessage(startPlayer));

        if (!startPlayer)
            this.calculateRobotMove();
    }

    isStarted() {

        let gameState = this.store.getState();
        return gameState.started;
    }

    isHumanPlayerRound() {

        let gameState = this.store.getState();
        return gameState.isHumanPlayerRound;
    }

    makeMovePlayer(cell: CellState) {

        this.playerMove(cell);

        if (this.isStarted())
            this.calculateRobotMove();
    }

    makeMoveRobot(cell: CellState) {

        this.calculateRobotMove();
    }

    // private functions

    private playerMove(cell: CellState) {

        let sign = CellSign.x;

        const updatedCell: CellState = {
            x: cell.x,
            y: cell.y,
            sign: sign,
            step: -1
        };

        this.dispatchMove(updatedCell);
    }

    private calculateRobotMove() {

        this.store.dispatch(GameStateMessageActions.gameStateRobotIsThinkingMessage(true));

        this.robotService.makeMove(this.store.getState().gridState.cells).subscribe((cell) => {

            this.dispatchMove(cell);
            this.store.dispatch(GameStateMessageActions.gameStateRobotIsThinkingMessage(false));
        });
    }

    private dispatchMove(cell: CellState) {

        let max = this.getMaxStep();
        this.store.dispatch(CellStateMessageActions.cellStateMakeMoveMessage({ x: cell.x, y: cell.y, sign: cell.sign, step: max + 1 }));

        let winner = this.getTheWinner();
        let someNone = this.store.getState().gridState.cells.some(cell => cell.sign == CellSign.none);
        if (winner == CellSign.none && someNone)
            return;

        this.store.dispatch(GameStateMessageActions.gameStateTheWinnerIsMessage(winner));

        if (winner != CellSign.none) {
            this.winService.win(this.store.getState().gridState.cells).subscribe((status) => {
                console.log("STATUS: " + status);
            });
        }
    }

    private getMaxStep() {
        let steps = this.store.getState().gridState.cells.map(cell => cell.step);
        let max = Math.max.apply(null, steps);

        return max;
    }

    private getTheWinner() {

        let cells = this.store.getState().gridState.cells;

        let winner = CellSign.none;

        // check rows
        for (let index = 0; index < 9; index += 3) {

            let row = cells.slice(index, index + 3);
            if (row.every(cell => cell.sign == CellSign.x)) {
                winner = CellSign.x;
                break;
            }
            if (row.every(cell => cell.sign == CellSign.o)) {
                winner = CellSign.o;
                break;
            }
        }

        // check columns
        for (let index = 0; index < 3; index += 1) {

            if (cells[index].sign == CellSign.x && cells[index + 3].sign == CellSign.x && cells[index + 6].sign == CellSign.x) {
                winner = CellSign.x;
                break;
            }
            if (cells[index].sign == CellSign.o && cells[index + 3].sign == CellSign.o && cells[index + 6].sign == CellSign.o) {
                winner = CellSign.o;
                break;
            }
        }

        // check diagonals
        if (cells[0].sign == CellSign.x && cells[4].sign == CellSign.x && cells[8].sign == CellSign.x) {
            winner = CellSign.x;
        }
        if (cells[0].sign == CellSign.o && cells[4].sign == CellSign.o && cells[8].sign == CellSign.o) {
            winner = CellSign.o;
        }
        if (cells[2].sign == CellSign.x && cells[4].sign == CellSign.x && cells[6].sign == CellSign.x) {
            winner = CellSign.x;
        }
        if (cells[2].sign == CellSign.o && cells[4].sign == CellSign.o && cells[6].sign == CellSign.o) {
            winner = CellSign.o;
        }

        return winner;
    }
}
