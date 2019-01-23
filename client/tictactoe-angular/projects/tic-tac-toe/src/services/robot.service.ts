import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CellState, CellSign } from '../redux/implementation/states';
import { Observable } from 'rxjs';

export class BaseRobotService {

    // constructor

    constructor(
        protected httpClient: HttpClient) {
    }

    makeMove(cells: Array<CellState>): Observable<CellState> {

        return null;
    }
}

@Injectable()
export class RobotMockService extends BaseRobotService {

    constructor(
        protected httpClient: HttpClient) {

        super(httpClient);
    }

    makeMove(cells: Array<CellState>): Observable<CellState> {

        return new Observable((subscriber) => {

            let freeCell = cells.find((cell) => cell.sign == CellSign.none);
            
            const updatedCell: CellState = {
                x: freeCell.x,
                y: freeCell.y,
                sign: CellSign.o,
                step: freeCell.step
            };
    
            subscriber.next(updatedCell);
            subscriber.complete();
        });
    }
}

@Injectable()
export class RobotService extends BaseRobotService {

    // constructor

    constructor(
        protected httpClient: HttpClient) {

        super(httpClient);
    }

    // public functions

    makeMove(cells: Array<CellState>): Observable<CellState> {

        return this.httpClient.put<CellState>("http://localhost:3000/ticatactoe/move", cells, this.buildOptions());
    }

    // private functions

    private buildOptions() {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let options = ({ headers: headers });

        return options;
    }
}
