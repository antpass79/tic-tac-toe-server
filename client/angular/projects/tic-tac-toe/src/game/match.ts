import { GameResult, Board } from "./board";
import { Player, Side } from "./players/player";

export class Match {

    private _board: Board = new Board();
    get board() {
        return this._board;
    }

    async play(player1: Player, player2: Player, games: number = 1): Promise<{ crossCount: number, naughtCount: number, drawCount: number }> {

        let draw_count = 0;
        let cross_count = 0;
        let naught_count = 0;

        for (let i = 0; i < games; i++) {
            let result = await this.game(player1, player2, this.board);
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

    static printStatistics(games: number, statistics: { crossCount: number, naughtCount: number, drawCount: number }) {

        console.log("After " + games + " game we have draws: " + statistics.drawCount + ", cross wins: " + statistics.crossCount + ", and naught wins: " + statistics.naughtCount + ".");
    
        let drawPercent = (statistics.drawCount / games * 100).toFixed(2);
        let crossPercent = (statistics.crossCount / games * 100).toFixed(2);
        let naughtPercent = (statistics.naughtCount / games * 100).toFixed(2);
    
        console.log("Which gives percentages of draws : cross : naught of about " + drawPercent + "% : " + crossPercent + "% : " + naughtPercent + "%");
      }    

    private async game(player1: Player, player2: Player, board: Board): Promise<GameResult> {

        this.board.reset();
        player1.newGame(Side.CROSS);
        player2.newGame(Side.NAUGHT);

        board.print();

        let finalResult = GameResult.NOT_FINISHED;

        let result = {
            gameResult: GameResult.NOT_FINISHED,
            finished: false
        };

        while (!result.finished) {

            result = await player1.move(board).toPromise();
            board.print();

            if (result.finished) {
                if (result.gameResult == GameResult.DRAW)
                    finalResult = GameResult.DRAW;
                else
                    finalResult = GameResult.CROSS_WIN;
            }
            else {
                result = await player2.move(board).toPromise();
                board.print();

                if (result.finished) {
                    if (result.gameResult == GameResult.DRAW)
                        finalResult = GameResult.DRAW;
                    else
                        finalResult = GameResult.NAUGHT_WIN;
                }
            }
        }

        player1.endGame(finalResult);
        player2.endGame(finalResult);

        return new Promise<GameResult>(resolve => {

            resolve(finalResult);
        });
    }
}