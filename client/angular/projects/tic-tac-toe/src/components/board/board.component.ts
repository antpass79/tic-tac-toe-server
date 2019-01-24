import { Component } from '@angular/core';
import { CellState } from '../../redux/implementation/states';
import { BoardService } from '../../services/board.service';

@Component({
    selector: 'board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
})
export class BoardComponent {

    // data members

    private _cells: Array<CellState>;
    get cells(): Array<CellState> {
        return this._cells;
    }

    // Constructor

    constructor(private boardService: BoardService) {
        
        this._cells = this.boardService.state.map((side, index) => {

            let coordinate = BoardService.getCoordinate(index);
            return {
                x: coordinate.x,
                y: coordinate.y,
                side: side                
            }
        });
    }

    onCellClick(state: CellState) {
        
        let index = BoardService.getIndex(state.x, state.y);
        this.boardService.state[index] = 1;
    }
}
