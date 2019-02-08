import { Component, Input } from '@angular/core';
import { CellState } from '../../store/states/board.state';
import { BoardUtils } from '../../game/utils';

@Component({
    selector: '[cell]',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.css']
})
export class CellComponent {

    @Input()
    state: CellState;

    get index() {
        return !this.state ? -1 : BoardUtils.getIndex(this.state.x, this.state.y);
    }

    // Constructor

    constructor() {
    }
}
