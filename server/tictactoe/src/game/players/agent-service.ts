import { Observable } from 'rxjs';
import Axios, * as axios from 'axios';

import { Player, Side } from './player';
import { GameResult, Board } from '../board';

export class AgentService {

    private configuration: axios.AxiosRequestConfig = {
        method: "POST",
        responseType: 'json',
        headers: {
            "Content-Type": "application/json"
        }
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

    private updateConfiguration(action: string, data: any, message: string): void {

        let url = "http://localhost:8080/" + action;
        let jsonData = data ? JSON.stringify(data) : null;
        console.log('jsonData - action ' + action + ' - ' + message);
        console.log(jsonData);

        this.configuration.url = url;
        this.configuration.data = jsonData;
    }
}