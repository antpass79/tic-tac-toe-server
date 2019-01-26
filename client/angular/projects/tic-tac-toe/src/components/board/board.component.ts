import { Component, Output, EventEmitter } from '@angular/core';
import { CellState, GameState, Side } from '../../redux/implementation/states';
import { Observable } from 'rxjs';
import { Store } from '../../redux/store';
import { GameStore } from '../../redux/implementation/providers';
import { Inject } from '@angular/core';

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

    constructor(@Inject(GameStore) private store: Store<GameState>) {
        
        this._cells$ = this.store.select("boardState", "cells");
    }

    onCellClick(state: CellState) {

        if (state.side == Side.EMPTY)
            this.cellClick.emit(state);
    }
}
