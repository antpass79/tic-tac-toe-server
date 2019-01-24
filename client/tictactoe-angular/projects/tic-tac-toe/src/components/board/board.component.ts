import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { CellState } from '../cell/cell.component';
import { BoardService } from './board.service';

@Component({
    selector: 'board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent {

    // data members

    cellStates$: Observable<Array<CellState>>;

    // Constructor

    constructor(private boardService: BoardService) {

        this.cellStates$ = boardService.state
    }

    onCellClick(state: CellState) {

    }
}
