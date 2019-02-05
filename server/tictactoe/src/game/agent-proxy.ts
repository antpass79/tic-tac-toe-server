import { Observable } from 'rxjs';
import Axios, * as axios from 'axios';

import { GameResult, Board } from './board';
import { NodeConfig } from '../web-service/utilities/node-config';

export enum Side {

    EMPTY = 0,
    CROSS = 1,
    NAUGHT = 2
}

export class AgentProxy {

    // data members

    private configuration: axios.AxiosRequestConfig;

    private _endpoint: string;

    // constructor

    constructor(nickname: string) {

        let nodeConfig = new NodeConfig();
        this._endpoint = nodeConfig.getValue('endpoint');

        this.configuration = {
            method: "POST",
            responseType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Nickname": nickname
            }
        }

        console.log(this.configuration);
    }

    // public functions

    nickname(nickname: string): Observable<any> {

        this.updateConfiguration('nickname', nickname, 'nickname with play');

        return new Observable(subscriber => {

            Axios(this.configuration)
                .then((response) => {
                    subscriber.next(response.data);
                    subscriber.complete();
                })
                .catch((reason) => {
                    subscriber.error(reason);
                    subscriber.complete();
                })
        })
    }

    newGame(side: Side): Observable<Side> {

        this.updateConfiguration('new', side, 'agent side ' + (side == 1 ? 'NAUGHT' : 'CROSS'));

        return new Observable(subscriber => {

            Axios(this.configuration)
                .then((response) => {
                    subscriber.next(response.data);
                    subscriber.complete();
                })
                .catch((reason) => {
                    subscriber.error(reason);
                    subscriber.complete();
                })
        })
    }

    move(board: Board): Observable<number[]> {

        this.updateConfiguration('move', board, 'state board before agent move');

        return new Observable(subscriber => {
            Axios(this.configuration)
                .then((response) => {

                    subscriber.next(response.data);
                    subscriber.complete();
                })
                .catch((reason) => {
                    subscriber.error(reason);
                    subscriber.complete();
                })
        })
    }

    endGame(gameResult: GameResult): Observable<GameResult> {

        this.updateConfiguration('end', gameResult, 'game result is ' + (gameResult == GameResult.CROSS_WIN ? 'CROSS_WIN' : (gameResult == GameResult.NAUGHT_WIN ? 'NAUGHT_WIN' : (gameResult == GameResult.DRAW ? 'DRAW' : 'NOT_FINISHED'))));

        return new Observable(subscriber => {

            Axios(this.configuration)
                .then((response) => {
                    subscriber.next(response.data);
                    subscriber.complete();
                })
                .catch((reason) => {
                    subscriber.error(reason);
                    subscriber.complete();
                })
        })
    }

    train(games: number): Observable<any> {

        this.updateConfiguration('train', games, 'games count for training');

        return new Observable(subscriber => {

            Axios(this.configuration)
                .then((response) => {
                    subscriber.next(response.data);
                    subscriber.complete();
                })
                .catch((reason) => {
                    subscriber.error(reason);
                    subscriber.complete();
                })
        })
    }

    clean(): Observable<any> {

        this.updateConfiguration('clean', undefined, 'cleaning the agent training');

        return new Observable(subscriber => {

            Axios(this.configuration)
                .then((response) => {
                    subscriber.next(response.data);
                    subscriber.complete();
                })
                .catch((reason) => {
                    subscriber.error(reason);
                    subscriber.complete();
                })
        })
    }

    // private functions

    private updateConfiguration(action: string, data: any, message: string): void {

        let url = this._endpoint + action;
        let jsonData = data ? JSON.stringify(data) : JSON.stringify('NO DATA TO SEND');
        console.log('jsonData - action ' + action + ' - ' + message);
        console.log(jsonData);

        this.configuration.url = url;
        this.configuration.data = jsonData;
    }
}