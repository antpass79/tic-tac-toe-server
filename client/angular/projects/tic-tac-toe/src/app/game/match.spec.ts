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

    it('should return the games value (5) from play, as sum of all counts (cross, maught, draw) with random players', async(() => {

        let games = 5;
        let player1 = new RandomPlayer(Side.CROSS);
        let player2 = new RandomPlayer(Side.NAUGHT);

        match.play(player1, player2, games, true).then((result) => {
            expect(result.crossCount + result.naughtCount + result.drawCount).toEqual(games);
        });
    }));

    it('should return the games value (5) from play, as sum of all counts (cross, maught, draw) with human players', async (done) => {

        let click1: EventEmitter<CellState> = new EventEmitter<CellState>();
        let click2: EventEmitter<CellState> = new EventEmitter<CellState>();

        let games = 5;
        let player1 = new HumanPlayer(Side.CROSS, click1);
        let player2 = new HumanPlayer(Side.NAUGHT, click2);

        match.play(player1, player2, games, true).then(result => {
            expect(result.crossCount + result.naughtCount + result.drawCount).toEqual(games);
            done();
        });

        for (let game = 0; game < games; game++) {
            for (let nextIndex = 0; nextIndex < 8;) {
                nextIndex = await click(click1, nextIndex);
                nextIndex = await click(click2, nextIndex);
            }
        }
    });
})

async function click(click: EventEmitter<CellState>, index: number) {

    return new Promise<number>((resolve) => {

        setTimeout(() => {

            let coordinate = Board.getCoordinate(index);
            click.emit({
                side: Side.NAUGHT,
                x: coordinate.x,
                y: coordinate.y
            });

            index++;
            resolve(index);

        }, 0);
    });
}