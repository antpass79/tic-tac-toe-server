import { EventEmitter } from "@angular/core";

import { GameResult, Board } from "./board";
import { IPlayer } from "./players/player";
import { Side } from "../store/states/board.state";

export class Match {

    roundChange: EventEmitter<Side> = new EventEmitter<Side>();

    private _board: Board = new Board();
    get board() {
        return this._board;
    }

    async play(player1: IPlayer, player2: IPlayer, games: number = 1, silent: boolean = false): Promise<{ crossCount: number, naughtCount: number, drawCount: number }> {

        let drawCount = 0;
        let crossCount = 0;
        let naughtCount = 0;

        for (let i = 0; i < games; i++) {
            let result = await this.game(player1, player2, silent);
            if (result == GameResult.CROSS_WIN)
                crossCount += 1;
            else if (result == GameResult.NAUGHT_WIN)
                naughtCount += 1;
            else
                drawCount += 1;
        }

        return new Promise<{ crossCount: number, naughtCount: number, drawCount: number }>(resolve => {

            let result = {
                crossCount: crossCount,
                naughtCount: naughtCount,
                drawCount: drawCount
            };

            resolve(result);
        });
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

            this.roundChange.emit(player1.side);

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

                this.roundChange.emit(player2.side);

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

            this.roundChange.emit(Side.EMPTY);

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