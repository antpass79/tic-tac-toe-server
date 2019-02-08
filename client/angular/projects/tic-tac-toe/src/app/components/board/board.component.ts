import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Component, Output, EventEmitter } from '@angular/core';
import { CellState, Side } from '../../store/states/board.state';
import { listenForCells } from '../../store/selectors/board.selector';
import { AppState } from '../../store/states/app.state';

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

    private _cells$: Observable<Array<CellState>>;
    get cells(): Observable<Array<CellState>> {
        return this._cells$;
    }

    // Constructor

    constructor(private store: Store<AppState>) {
        
        this._cells$ = this.store.pipe(select(listenForCells));
    }

    onCellClick(state: CellState) {

        if (state.side == Side.EMPTY)
            this.cellClick.emit(state);
    }
}
