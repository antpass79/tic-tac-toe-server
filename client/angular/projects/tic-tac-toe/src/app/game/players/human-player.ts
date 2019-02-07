import { Player, Side } from './player';
import { GameResult, Board } from '../board';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { CellState } from '../../redux/implementation/states';

export class HumanPlayer extends Player {

    constructor(side: Side, private click: EventEmitter<CellState>) {

        super(side);
    }

    move(board: Board): Observable<{ gameResult: GameResult, finished: boolean }> {

        return new Observable((subscriber) => {

            let clickSubscriber = this.click.subscribe((cellState: CellState) => {

                clickSubscriber.unsubscribe();
                
                let moveResult = board.move(Board.getIndex(cellState.x, cellState.y), this.side);
                let result = { gameResult: moveResult.result, finished: moveResult.finished };
         
                subscriber.next(result);
                subscriber.complete();
            });
        });
    }
}