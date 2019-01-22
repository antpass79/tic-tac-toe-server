import { expect } from 'chai';
import { Side } from '../../../src/game/players/player';
import { AgentPlayer } from '../../../src/game/players/agent-player';
import { Board, GameResult } from '../../../src/game/board';

describe('AgentPlayer', () => {

    context('initialize', () => {

        it('should have default side value set to EMPTY', () => {

            let player = new AgentPlayer();
            expect(player.side).to.equal(Side.EMPTY);
        });

        it('should have side value set to CROSS', () => {

            let player = new AgentPlayer();
            player.newGame(Side.CROSS);
            expect(player.side).to.equal(Side.CROSS);
        });

        it('should have side value set to NAUGHT', () => {

            let player = new AgentPlayer();
            player.newGame(Side.NAUGHT);
            expect(player.side).to.equal(Side.NAUGHT);
        });
    });

    context('move', () => {

        it('should return !finished after player creation', async () => {

            let board = new Board();
            let player = new AgentPlayer();
            let result = await player.move(board).toPromise();

            expect(result.finished).to.equal(false);
        });

        it('should return finished after a game', async () => {

            let board = new Board();
            let player = new AgentPlayer();

            let result = {
                gameResult: GameResult.NOT_FINISHED,
                finished: false
            };

            for (let i = 0; i < 9; i++) {
                result = await player.move(board).toPromise();
            }

            expect(result.finished).to.equal(true);
        });
    });
});

async function game(player: AgentPlayer, board: Board): Promise<{ gameResult: GameResult, finished: boolean }> {

    return new Promise<{ gameResult: GameResult, finished: boolean }>((resolve) => {

        player.move(board).subscribe((result: { gameResult: GameResult, finished: boolean }) => {

            resolve(result);
        });
    });
}
