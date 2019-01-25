import { Component, Output, EventEmitter } from '@angular/core';
import { CellState } from '../../redux/implementation/states';
import { BoardService } from '../../services/board.service';

@Component({
    selector: 'board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
})
export class BoardComponent {

    // events

    @Output()
    cellClick: EventEmitter<CellState> = new EventEmitter();

    // data members

    private _cells: Array<CellState>;
    get cells(): Array<CellState> {
        return this._cells;
    }

    // Constructor

    constructor(private boardService: BoardService) {
        
        this._cells = this.boardService.board.state.map((side, index) => {

            let coordinate = BoardService.getCoordinate(index);
            return {
                x: coordinate.x,
                y: coordinate.y,
                side: side                
            }
        });
    }

    onCellClick(state: CellState) {

        this.cellClick.emit(state);
    }
}
