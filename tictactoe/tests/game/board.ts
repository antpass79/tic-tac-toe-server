import { expect } from 'chai';
import { Board } from '../../src/game/board';
import { Side } from '../../src/game/players/player';

describe('Board', () => {

    context('initialize', () => {

        it('should have default state not null', () => {

            let board = new Board();
            expect(board.state).to.be.not.null;
        });

        it('should have default 9 cells set to EMPTY', () => {

            let board = new Board();
            expect(board.state).to.be.eqls([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });
    });

    context('otherSide', () => {

        it('should return NAUGHT passing CROSS', () => {

            let otherSide = Board.otherSide(Side.CROSS);
            expect(otherSide).to.be.equal(Side.NAUGHT);
        });

        it('should return CROSS passing NAUGHT', () => {

            let otherSide = Board.otherSide(Side.NAUGHT);
            expect(otherSide).to.be.equal(Side.CROSS);
        });

        it('should throw Error passing EMPTY', () => {

            expect(() => Board.otherSide(Side.EMPTY)).to.throw("EMPTY has no 'other side'");
        });

        it('should throw Error passing -1', () => {

            let value = -1;
            expect(() => Board.otherSide(value)).to.throw(value + " is not a valid side");
        });
    });

    context('move', () => {

        it('should set state based on move 0 for CROSS', () => {

            let board = new Board();
            board.move(0, Side.CROSS);
            expect(board.state).to.be.eqls([1, 0, 0, 0, 0, 0, 0, 0, 0]);
        });

        it('should set state based on move 3 for NAUGHT', () => {

            let board = new Board();
            board.move(3, Side.NAUGHT);
            expect(board.state).to.be.eqls([0, 0, 0, 2, 0, 0, 0, 0, 0]);
        });

        it('should throw error moving on 3 that is filled', () => {

            let board = new Board();
            board.move(3, Side.NAUGHT);
            expect(() => board.move(3, Side.NAUGHT)).to.throw("Invalid move");
        });

        it('should return finished set to false after one move', () => {

            let board = new Board();
            let result = board.move(3, Side.NAUGHT);
            expect(result.finished).to.be.equal(false);
        });

        it('should return finished set to true after 9 moves in different positions', () => {

            let result: any;

            let board = new Board();

            for (let i = 0; i < board.state.length; i++)
                result = board.move(i, Side.NAUGHT);

            expect(result.finished).to.be.equal(true);
        });
    });

    context('reset', () => {

        it('should set state to default value after move 0 for CROSS', () => {

            let board = new Board();
            board.move(0, Side.CROSS);
            board.reset();
            expect(board.state).to.be.eqls([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });
    });

    context('randomEmptySpot', () => {

        it('should generate a number between 0 - 8, after 10 cycles', () => {

            let board = new Board();

            for (let i = 0; i < 10; i++) {
                let empty = board.randomEmptySpot();
                expect(empty).to.be.greaterThan(-1);
                expect(empty).to.be.lessThan(9);
            }
        });

        it('should generate a number between 0 - 8 except 1, after 10 cycles', () => {

            let board = new Board();
            board.move(1, Side.CROSS);

            for (let i = 0; i < 10; i++) {
                let empty = board.randomEmptySpot();
                expect(empty).to.be.not.equal(1);
            }
        });
    });

    context('isLegal', () => {

        it('should return true after board creation', () => {

            let board = new Board();
            let isLegal = board.isLegal(3);
            expect(isLegal).to.be.equal(true);
        });

        it('should return false for a filled random position (using randomEmptySpot)', () => {

            let board = new Board();
            let random = board.randomEmptySpot();
            board.move(random, Side.CROSS);
            let isLegal = board.isLegal(random);
            expect(isLegal).to.be.equal(false);
        });
    });
});