import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Side } from '../redux/implementation/states';
import { Observable } from 'rxjs';
import { GameResult } from '../game/board';
import { IAppConfig } from '../app.config';
import { NicknameStoreService } from './nickname-store.service';

@Injectable({
    providedIn: 'root'
})
export class AgentProxyService {

    // data members

    private _endpoint: string;

    // constructor

    constructor(
        protected httpClient: HttpClient,
        private nicknameStoreService: NicknameStoreService,
        appConfig: IAppConfig) {

            this._endpoint = appConfig.getValue('endpoint');
    }

    // public functions

    nickname(nickname: string): Observable<string> {

        this.nicknameStoreService.nickname = nickname;

        let data = {
            nickname: nickname
        };

        return this.httpClient.post<string>(this.buildEndpoint('nickname'), JSON.stringify(data), this.buildOptions());
    }

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

    clean(): Observable<number> {

        return this.httpClient.post<any>(this.buildEndpoint('clean'), undefined, this.buildOptions());
    }

    // private functions

    private buildEndpoint(action: string) {

        return this._endpoint + action;
    }

    private buildOptions() {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let options = ({ headers: headers });

        return options;
    }
}
