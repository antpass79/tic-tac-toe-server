import { Observable } from 'rxjs';
import * as http from 'http';

import { Player, Side } from './player';
import { GameResult, Board } from '../board';

export class AgentProxy {

    private options = {
        host: "localhost",
        port: 4000,
        method: "PUT",
        path: '',
        headers: {
            "Content-Type": "application/json"
        }
    }

    async newGame(side: Side): Promise<any> {

        return new Observable<any>((subscriber) => {

            this.options.path = this.buildPath('new');
            let predictionReq = http.request(this.options, function (res) {

                res.on('data', function (data) {
    
                    subscriber.next(data);
                    subscriber.complete();        
                });
    
                res.on('error', function (e) {
                    subscriber.error(e);
                    subscriber.complete();        
                });
            });

            let dataToSend = JSON.stringify(side);
            predictionReq.end(dataToSend);                
        }).toPromise();
     }

    async move(board: Board): Promise<{ gameResult: GameResult, finished: boolean }> {

        return new Observable<any>((subscriber) => {

            this.options.path = this.buildPath('move');
            let predictionReq = http.request(this.options, function (res) {

                res.on('data', function (data) {
    
                    subscriber.next(data);
                    subscriber.complete();        
                });
    
                res.on('error', function (e) {
                    subscriber.error(e);
                    subscriber.complete();        
                });
            });

            let dataToSend = JSON.stringify(board);
            predictionReq.end(dataToSend);                
        }).toPromise();
    }

    async end(gameResult: GameResult): Promise<any> {

        return new Observable<any>((subscriber) => {

            this.options.path = this.buildPath('end');
            let predictionReq = http.request(this.options, function (res) {

                res.on('data', function (data) {
    
                    subscriber.next(data);
                    subscriber.complete();        
                });
    
                res.on('error', function (e) {
                    subscriber.error(e);
                    subscriber.complete();        
                });
            });

            let dataToSend = JSON.stringify(gameResult);
            predictionReq.end(dataToSend);                
        }).toPromise();
    }

    private buildPath(verb: string): string {

        return "http://localhost:8080/" + verb;
    }
}

export class AgentPlayer extends Player {

    agentProxy: AgentProxy = new AgentProxy();

    newGame(side: Side): void {

        let wait = true;

        this.agentProxy.newGame(side)
        .then(() => {
            wait = false;
        })
        .catch(() => {
            wait = false;
        });

        //while(wait);
    }

    move(board: Board): { gameResult: GameResult, finished: boolean } {

        let wait = true;
        let result = {
            gameResult: GameResult.NOT_FINISHED,
            finished: false
        };

        this.agentProxy.move(board)
        .then((data) => {

            result = {
                gameResult: data.gameResult,
                finished: data.finished
            }
            wait = false;
        })
        .catch(() => {
            wait = false;
        });

        while(wait);

        return result;
    }

    end(gameResult: GameResult): void {

        let wait = true;

        this.agentProxy.end(gameResult)
        .then(() => {
            wait = false;
        })
        .catch(() => {
            wait = false;
        });

        while(wait);
    }
}