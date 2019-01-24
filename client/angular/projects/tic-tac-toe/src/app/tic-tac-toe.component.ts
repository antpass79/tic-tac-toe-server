import { Component } from '@angular/core';

@Component({
    selector: 'tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {

    private _busy: boolean = false;
    get busy(): boolean {
        return this._busy;
    }

    // Constructor

    constructor() {
    }
}
