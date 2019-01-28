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

        this.updateConfiguration('new', side);

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

        this.updateConfiguration('move', board);

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

        this.updateConfiguration('end', gameResult);

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

    train(games: number): Observable<number> {

        this.updateConfiguration('train', games);

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

    private updateConfiguration(action: string, data?: any): void {

        let url = "http://localhost:8080/" + action;
        let jsonData = data ? JSON.stringify(data) : null;
        console.log('jsonData' + ' ' + action);
        console.log(jsonData);

        this.configuration.url = url;
        this.configuration.data = jsonData;
    }
}