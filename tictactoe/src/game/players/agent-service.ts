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
        })
    }

    move(board: Board): Observable<{ gameResult: GameResult, finished: boolean }> {

        this.updateConfiguration('move', board);

        return new Observable(subscriber => {
            Axios(this.configuration)
                .then((response) => {

                    console.log(response.data);
                    subscriber.next(response.data);
                    subscriber.complete();
                })
        })
    }

    end(gameResult: GameResult): void {

        this.updateConfiguration('end', gameResult);

        Axios(this.configuration)
            .then((response) => {
            })
    }

    private updateConfiguration(action: string, data?: any): void {

        let url = "http://localhost:8080/" + action;
        let jsonData = data ? JSON.stringify(data) : null;

        this.configuration.url = url;
        this.configuration.data = jsonData;
    }
}