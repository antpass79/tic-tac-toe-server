import { Component, Input } from '@angular/core';

export class CellState {

    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

@Component({
    selector: '[cell]',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.css']
})
export class CellComponent {

    get index() {
        return !this.state ? -1 : this.state.x * 3 + this.state.y;
    }

    @Input()
    state: CellState;

    // Constructor

    constructor() {
    }
}
