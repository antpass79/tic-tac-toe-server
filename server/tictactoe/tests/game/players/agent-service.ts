import { expect } from 'chai';
import { Done } from 'mocha';
import { Side } from '../../../src/game/players/player';
import { AgentService } from '../../../src/game/players/agent-service';
import { Board, GameResult } from '../../../src/game/board';
import { Observable } from 'rxjs';

describe('AgentService', () => {

    context('newGame', () => {

        it('should return the passed value CROSS', async () => {

            let service = new AgentService();
            let side = await service.newGame(Side.CROSS).toPromise();

            expect(side).to.equal(Side.CROSS);            
        });

        it('should return the passed value NAUGHT', async () => {

            let service = new AgentService();
            let side = await service.newGame(Side.NAUGHT).toPromise()

            expect(side).to.equal(Side.NAUGHT);
        });
    });

    context('move', () => {

        it('should return a state with only a CROSS after a move', async () => {

            let board = new Board();
            let service = new AgentService();
            let result = await game(service, board);

            expect(result.state).to.be.contains(2);                
        });

        it('should return a fill state (CROSS) after a game', async () => {

            let board = new Board();
            let service = new AgentService();            

            for (let i = 0; i < 9; i++) {
                board = await game(service, board);
            }

            expect(board.state).to.be.eqls([2, 2, 2, 2, 2, 2, 2, 2, 2]);
        })
    });
});

async function game(service: AgentService, board: Board): Promise<Board> {

    return new Promise<Board>((resolve) => {

        service.move(board).subscribe((state: number[]) => {

            board.updateState(state);
            resolve(board);
        });
    });
}
