import { Component, Input } from '@angular/core';
import { CellState } from '../../redux/implementation/states';
import { Board } from '../../game/board';

@Component({
    selector: '[cell]',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.css']
})
export class CellComponent {

    @Input()
    state: CellState;

    get index() {
        return !this.state ? -1 : Board.getIndex(this.state.x, this.state.y);
    }

    // Constructor

    constructor() {
    }
}
