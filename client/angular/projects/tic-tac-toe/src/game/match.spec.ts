import { TestBed, async } from '@angular/core/testing';

import { Match } from './match';
import { RandomPlayer } from './players/random-player';
import { HumanPlayer } from './players/human-player';
import { CellState, Side } from '../redux/implementation/states';
import { EventEmitter } from '@angular/core';
import { Board } from './board';

describe('Match', () => {

    let match: Match;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [Match]
        });

        match = TestBed.get(Match);
    }));

    it('should create Match', () => {
        expect(match).toBeTruthy();
    });

    it('should return the games (5) value from play, as sum of all counts (cross, maught, draw) with random players', async(() => {

        let games = 5;
        let player1 = new RandomPlayer(Side.CROSS);
        let player2 = new RandomPlayer(Side.NAUGHT);

        match.play(player1, player2, games, true).then((result) => {
            expect(result.crossCount + result.naughtCount + result.drawCount).toEqual(games);
        });
    }));

    it('should return the games (5) value from play, as sum of all counts (cross, maught, draw) with human player and random player', async(() => {

        let click1: EventEmitter<CellState> = new EventEmitter<CellState>();
        let click2: EventEmitter<CellState> = new EventEmitter<CellState>();

        let games = 5;
        let player1 = new HumanPlayer(Side.CROSS, click1);
        let player2 = new HumanPlayer(Side.NAUGHT, click2);

        match.play(player1, player2, games, true).then((result) => {
            expect(result.crossCount + result.naughtCount + result.drawCount).toEqual(games);
        });

        for(let index = 0; index < 19; index++) {
        //slowEach(array, 100, function (element, index) {

            let coordinate1 = Board.getCoordinate(index);
            click1.emit({
                side: Side.CROSS,
                x: coordinate1.x,
                y: coordinate1.y
            });

            let coordinate2 = Board.getCoordinate(index + 1);
            click2.emit({
                side: Side.NAUGHT,
                x: coordinate2.x,
                y: coordinate2.y
            });
        }//);
    }));
})

function slowEach(array, interval, callback) {
    if (!array.length) return;
    var i = 0;
    next();
    function next() {
        if (callback(array[i], i) !== false) {
            if (++i < array.length) {
                setTimeout(next, interval);
            }
        }
    }
}