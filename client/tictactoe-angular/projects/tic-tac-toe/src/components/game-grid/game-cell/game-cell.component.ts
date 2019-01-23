import { Component, Input } from '@angular/core';
import { CellState } from 'projects/tic-tac-toe/src/redux/implementation/states';

@Component({
    selector: '[game-cell]',
    templateUrl: './game-cell.component.html',
    styleUrls: ['./game-cell.component.css']
})
export class GameCellComponent {

    // data members

    @Input()
    cell: CellState;
    @Input()
    index: number;

    // Constructor

    constructor() {
    }
}
