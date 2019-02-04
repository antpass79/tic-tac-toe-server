import { expect } from 'chai';
import { Board } from '../../src/game/board';
import { Side } from '../../src/game/agent-proxy';

describe('Board', () => {

    context('.ctor', () => {

        it('should have the state array length to 9 after .ctor', () => {

            let board = new Board();
            expect(board.state.length).to.be.eql(9);
        });

        it('should have every positions of the array set to EMPTY after .ctor', () => {

            let board = new Board();
            expect(board.state).to.be.eqls([Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY]);
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

        it('should set the state at position 0 to CROSS', () => {

            let board = new Board();
            board.move(0, Side.CROSS);
            expect(board.state).to.be.eqls([Side.CROSS, 0, 0, 0, 0, 0, 0, 0, 0]);
        });

        it('should set the state at position 3 to NAUGHT', () => {

            let board = new Board();
            board.move(3, Side.NAUGHT);
            expect(board.state).to.be.eqls([0, 0, 0, Side.NAUGHT, 0, 0, 0, 0, 0]);
        });

        it('should throw error moving at position 3, after a previous move at position 3', () => {

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

        it('should generate a number between 0 - 8, for each of 10 cycles', () => {

            let board = new Board();

            for (let i = 0; i < 10; i++) {
                let empty = board.randomEmptySpot();
                expect(empty).to.be.greaterThan(-1);
                expect(empty).to.be.lessThan(9);
            }
        });

        it('should generate a number between 0 - 8 except 1 after a move at position 1, for each of 10 cycles', () => {

            let board = new Board();
            board.move(1, Side.CROSS);

            for (let i = 0; i < 10; i++) {
                let empty = board.randomEmptySpot();
                expect(empty).to.be.not.equal(1);
            }
        });
    });

    context('isLegal', () => {

        it('should return true after board .ctor, checking all 9 positions of the state', () => {

            let board = new Board();
            for (let i = 0; i < 9; i++) {
                let isLegal = board.isLegal(i);
                expect(isLegal).to.be.equal(true);
            }
        });

        it('should return false checking a filled random position', () => {

            let board = new Board();
            let random = board.randomEmptySpot();
            board.move(random, Side.CROSS);
            let isLegal = board.isLegal(random);
            expect(isLegal).to.be.equal(false);
        });
    });
});