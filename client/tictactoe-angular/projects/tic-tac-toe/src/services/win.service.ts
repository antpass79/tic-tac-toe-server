import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CellState, CellSign } from '../redux/implementation/states';
import { Observable } from 'rxjs';

@Injectable()
export class WinService {

    // constructor

    constructor(
        protected httpClient: HttpClient) {
    }

    // public functions

    win(cells: Array<CellState>): Observable<number> {

        return this.httpClient.post<number>("http://localhost:3000/ticatactoe/win", cells, this.buildOptions());
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
