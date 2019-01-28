from Board import Board, GameResult, CROSS, NAUGHT
from players.Player import Player

class Match:

    def play(self, player1: Player, player2: Player, games = 1) -> (int, int, int):

        board = Board()
        draw_count = 0
        cross_count = 0
        naught_count = 0

        for _ in range(games):
            result = self.game(player1, player2, board)
            if result == GameResult.CROSS_WIN:
                cross_count += 1
            elif result == GameResult.NAUGHT_WIN:
                naught_count += 1
            else:
                draw_count += 1

        return cross_count, naught_count, draw_count

    def game(self, player1: Player, player2: Player, board: Board) -> GameResult:
        
        player1.new_game(CROSS)
        player2.new_game(NAUGHT)
        board.reset()

        finished = False
        while not finished:
            result, finished = player1.move(board)
            if finished:
                if result == GameResult.DRAW:
                    final_result = GameResult.DRAW
                else:
                    final_result = GameResult.CROSS_WIN
            else:
                result, finished = player2.move(board)
                if finished:
                    if result == GameResult.DRAW:
                        final_result = GameResult.DRAW
                    else:
                        final_result = GameResult.NAUGHT_WIN

        player1.final_result(final_result)
        player2.final_result(final_result)

        return final_result