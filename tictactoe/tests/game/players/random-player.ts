import { expect } from 'chai';
import { Side } from '../../../src/game/players/player';
import { RandomPlayer } from '../../../src/game/players/random-player';
import { Board, GameResult } from '../../../src/game/board';

describe('RandomPlayer - initialize', () => {

    it('Should have default side value set to EMPTY', () => {

        let player = new RandomPlayer();
        expect(player.side).to.equal(Side.EMPTY);
    });

    it('Should have side value set to CROSS', () => {

        let player = new RandomPlayer();
        player.newGame(Side.CROSS);
        expect(player.side).to.equal(Side.CROSS);
    });

    it('Should have side value set to NAUGHT', () => {

        let player = new RandomPlayer();
        player.newGame(Side.NAUGHT);
        expect(player.side).to.equal(Side.NAUGHT);
    });

    it('move - Should return !finished after player creation', () => {

        let board = new Board();
        let player = new RandomPlayer();
        player.move(board).subscribe((moveResult) => {

            expect(moveResult.finished).to.equal(false);
        });
    });

    it('move - Should return finished after a game', () => {

        let result = {
            gameResult: GameResult.NOT_FINISHED,
            finished: false
        };

        let board = new Board();
        let player = new RandomPlayer();

        player.newGame(Side.CROSS);

        let counter = 0;
        while (!result.finished && counter < 10) {
             player.move(board).subscribe((moveResult) => {
                 
                result = moveResult;
            });
            counter++;
        }

        expect(result.finished).to.equal(true);
    });
});