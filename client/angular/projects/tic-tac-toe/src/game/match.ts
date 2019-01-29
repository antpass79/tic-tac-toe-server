import { GameResult, Board } from "./board";
import { Side, IPlayer } from "./players/player";

export class Match {

    private _board: Board = new Board();
    get board() {
        return this._board;
    }

    async play(player1: IPlayer, player2: IPlayer, games: number = 1, silent: boolean = false): Promise<{ crossCount: number, naughtCount: number, drawCount: number }> {

        let draw_count = 0;
        let cross_count = 0;
        let naught_count = 0;

        for (let i = 0; i < games; i++) {
            let result = await this.game(player1, player2, silent);
            if (result == GameResult.CROSS_WIN)
                cross_count += 1;
            else if (result == GameResult.NAUGHT_WIN)
                naught_count += 1;
            else
                draw_count += 1;
        }

        return {
            crossCount: cross_count,
            naughtCount: naught_count,
            drawCount: draw_count
        };
    }

    async game(player1: IPlayer, player2: IPlayer, silent: boolean): Promise<GameResult> {

        this.board.reset();
        await player1.newGame().toPromise();
        await player2.newGame().toPromise();

        if (!silent)
            this.board.print();

        let finalResult = GameResult.NOT_FINISHED;

        let result = {
            gameResult: GameResult.NOT_FINISHED,
            finished: false
        };

        while (!result.finished) {

            result = await player1.move(this.board).toPromise();
            if (!silent)
                this.board.print();

            if (result.finished) {
                if (result.gameResult == GameResult.DRAW)
                    finalResult = GameResult.DRAW;
                else
                    finalResult = player1.side == Side.CROSS ? GameResult.CROSS_WIN : GameResult.NAUGHT_WIN;
            }
            else {
                result = await player2.move(this.board).toPromise();
                if (!silent)
                    this.board.print();

                if (result.finished) {
                    if (result.gameResult == GameResult.DRAW)
                        finalResult = GameResult.DRAW;
                    else
                        finalResult = player2.side == Side.CROSS ? GameResult.CROSS_WIN : GameResult.NAUGHT_WIN;
                }
            }
        }

        await player1.endGame(finalResult).toPromise();
        await player2.endGame(finalResult).toPromise();

        return new Promise<GameResult>(resolve => {

            resolve(finalResult);
        });
    }

    static printStatistics(games: number, statistics: { crossCount: number, naughtCount: number, drawCount: number }) {

        console.log("After " + games + " game we have draws: " + statistics.drawCount + ", cross wins: " + statistics.crossCount + ", and naught wins: " + statistics.naughtCount + ".");
    
        let drawPercent = (statistics.drawCount / games * 100).toFixed(2);
        let crossPercent = (statistics.crossCount / games * 100).toFixed(2);
        let naughtPercent = (statistics.naughtCount / games * 100).toFixed(2);
    
        console.log("Which gives percentages of draws : cross : naught of about " + drawPercent + "% : " + crossPercent + "% : " + naughtPercent + "%");
      }    
}