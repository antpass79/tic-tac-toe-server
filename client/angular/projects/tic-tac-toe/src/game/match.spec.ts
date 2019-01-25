import { TestBed, async } from '@angular/core/testing';

import { Match } from './match';
import { RandomPlayer } from './players/random-player';

describe('Match', () => {

    let match: Match;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [Match]
        });

        match = TestBed.get(Match);
    }));

    it('should create Match', () => {
        expect(Match).toBeTruthy();
    });

    it('should return the games value from play, as sum of all counts (cross, maught, draw)', async(() => {

        let games = 5;
        let player1 = new RandomPlayer();
        let player2 = new RandomPlayer();

        match.play(player1, player2, games).then((result) => {
            expect(result.crossCount + result.naughtCount + result.drawCount).toEqual(games);

            Match.printStatistics(games, {
                crossCount: result.crossCount,
                naughtCount: result.naughtCount,
                drawCount: result.drawCount
            });
        });
    }));
})