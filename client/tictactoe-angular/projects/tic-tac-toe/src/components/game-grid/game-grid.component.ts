import { Component, ViewEncapsulation, Inject, EventEmitter, Output } from '@angular/core';
import { CellSign, GameState, CellState } from '../../redux/implementation/states';
import { Store } from '../../redux/store';
import { GameStore } from '../../redux/implementation/providers';
import { GameStateMessageActions, CellStateMessageActions } from '../../redux/implementation/actions';
import { Observable } from 'rxjs';
import { GameFlowService } from '../../services/game-flow.service';

@Component({
    selector: 'game-grid',
    templateUrl: './game-grid.component.html',
    styleUrls: ['./game-grid.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class GameGridComponent {

    // data members

    cells$: Observable<Array<CellState>>;

    // events

    @Output()
    cellClick: EventEmitter<CellState> = new EventEmitter();

    // Constructor

    constructor(private gameFlowService: GameFlowService) {

        this.cells$ = this.gameFlowService.listenCells();
    }

    // public functions

    onCellClick(cell: CellState) {

        this.cellClick.emit(cell);
    }
}
