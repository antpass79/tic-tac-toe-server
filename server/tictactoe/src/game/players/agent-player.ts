import { Observable } from 'rxjs';

import { Player, Side } from './player';
import { GameResult, Board } from '../board';
import { AgentService } from './agent-service';

export class AgentPlayer extends Player {

    agentService: AgentService = new AgentService();

    newGame(side: Side): void {

        super.newGame(side);
        this.agentService.newGame(side);
    }

    move(board: Board): Observable<{ gameResult: GameResult, finished: boolean }> {

        return new Observable(subscriber => {
        
            this.agentService.move(board).subscribe((state: number[]) => {

                board.updateState(state);
                let boardResult = board.getBoardState();
                let result = {
                    gameResult: boardResult.result,
                    finished: boardResult.finished
                }

                subscriber.next(result);
                subscriber.complete();
            });
        })
    }

    end(gameResult: GameResult): void {

        this.agentService.end(gameResult);
    }
}