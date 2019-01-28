import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CellState, Side } from '../redux/implementation/states';
import { Observable } from 'rxjs';
import { GameResult } from '../game/board';

@Injectable({
    providedIn: 'root'
})
export class AgentProxyService {

    // constructor

    constructor(
        protected httpClient: HttpClient) {
    }

    // public functions

    newGame(side: Side): Observable<number> {

        let data = {
            side: side            
        };

        return this.httpClient.post<number>(this.buildEndpoint('newgame'), JSON.stringify(data), this.buildOptions());
    }

    move(state: number[]): Observable<number[]> {

        return this.httpClient.post<number[]>(this.buildEndpoint('move'), state, this.buildOptions());
    }

    endGame(gameResult: GameResult): Observable<number> {

        let data = {
            gameResult: gameResult            
        };

        return this.httpClient.post<number>(this.buildEndpoint('endgame'), JSON.stringify(data), this.buildOptions());
    }

    train(games: number): Observable<number> {

        let data = {
            games: games
        };

        return this.httpClient.post<number>(this.buildEndpoint('train'), JSON.stringify(data), this.buildOptions());
    }

    // private functions

    private buildEndpoint(action: string) {

        return 'http://localhost:3000/tictactoe/' + action;
    }

    private buildOptions() {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let options = ({ headers: headers });

        return options;
    }
}
