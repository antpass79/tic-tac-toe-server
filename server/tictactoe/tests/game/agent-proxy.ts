import { expect } from 'chai';
import { AgentProxy, Side } from '../../src/game/agent-proxy';
import { Board } from '../../src/game/board';

describe('AgentProxy', () => {

    context('newGame', () => {

        it('should return the passed value CROSS', async () => {

            let agentProxy = new AgentProxy();
            let side = await agentProxy.newGame(Side.CROSS).toPromise();

            expect(side).to.equal(Side.CROSS);            
        });

        it('should return the passed value NAUGHT', async () => {

            let agentProxy = new AgentProxy();
            let side = await agentProxy.newGame(Side.NAUGHT).toPromise()

            expect(side).to.equal(Side.NAUGHT);
        });
    });

    context('move', () => {

        it('should return a state with only a CROSS after a move', async () => {

            let board = new Board();
            let agentProxy = new AgentProxy();
            let result = await game(agentProxy, board);

            expect(result.state).to.be.contains(2);                
        });

        it('should return a fill state (CROSS) after a game', async () => {

            let board = new Board();
            let agentProxy = new AgentProxy();            

            for (let i = 0; i < 9; i++) {
                board = await game(agentProxy, board);
            }

            expect(board.state).to.be.eqls([2, 2, 2, 2, 2, 2, 2, 2, 2]);
        })
    });
});

async function game(agentProxy: AgentProxy, board: Board): Promise<Board> {

    return new Promise<Board>((resolve) => {

        agentProxy.move(board).subscribe((state: number[]) => {

            board.updateState(state);
            resolve(board);
        });
    });
}
