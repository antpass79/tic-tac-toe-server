import { Player, Side } from './player';
import { GameResult, Board } from '../board';
import { Observable } from 'rxjs';
import { CellState } from '../../redux/implementation/states';
import { AgentProxyService } from '../../services/agent-proxy.service';

export class AgentPlayer extends Player {

    constructor(private agentProxyService: AgentProxyService) {

        super();
    }

    newGame(side: Side): Observable<Side> {

        return new Observable<Side>((subscriber) => {

            let agentSubscriber = this.agentProxyService.newGame(side).subscribe((response: any) => {

                agentSubscriber.unsubscribe();

                this._side = <number>response; 
                subscriber.next(this._side);
                subscriber.complete();
            });
        });
    }

    move(board: Board): Observable<{ gameResult: GameResult, finished: boolean }> {

        return new Observable((subscriber) => {

            let agentSubscriber = this.agentProxyService.move(board.state).subscribe((newState: number[]) => {

                agentSubscriber.unsubscribe();

                let moveResult = board.move(this.getMoveIndex(board.state, newState), this.side);
                let result = { gameResult: moveResult.result, finished: moveResult.finished };

                subscriber.next(result);
                subscriber.complete();
            });
        });
    }

    endGame(gameResult: GameResult): Observable<GameResult> {

        return new Observable<GameResult>((subscriber) => {

            let agentSubscriber = this.agentProxyService.endGame(gameResult).subscribe((response: any) => {

                agentSubscriber.unsubscribe();

                subscriber.next(response);
                subscriber.complete();
            });
        });
    }

    private getMoveIndex(source: number[], target: number[]) {

        for (let i = 0; i < source.length; i++) {

            if (source[i] != target[i])
                return i;
        }

        return -1;
    }
}