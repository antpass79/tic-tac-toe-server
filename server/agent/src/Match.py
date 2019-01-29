from Board import Board, GameResult, CROSS, NAUGHT
from players.Player import Player

class Match:

    is_playing = False

    def __init__(self):
        self.counter = 0

    def play(self, player1: Player, player2: Player, games = 1) -> (int, int, int):

        Match.is_playing = True

        board = Board()
        draw_count = 0
        cross_count = 0
        naught_count = 0

        self.counter = 0

        for _ in range(games):
            result = self.game(player1, player2, board)
            if result == GameResult.CROSS_WIN:
                cross_count += 1
            elif result == GameResult.NAUGHT_WIN:
                naught_count += 1
            else:
                draw_count += 1
            
            self.counter = self.counter + 1            

        Match.is_playing = False

        return cross_count, naught_count, draw_count

    def game(self, player1: Player, player2: Player, board: Board) -> GameResult:
        
        board.reset()

        finished = False
        while not finished:
            result, finished = player1.move(board)
            if finished:
                if result == GameResult.DRAW:
                    final_result = GameResult.DRAW
                else:
                    final_result = GameResult.CROSS_WIN if player1.side == CROSS else GameResult.NAUGHT_WIN
            else:
                result, finished = player2.move(board)
                if finished:
                    if result == GameResult.DRAW:
                        final_result = GameResult.CROSS_WIN if player2.side == CROSS else GameResult.NAUGHT_WIN
                    else:
                        final_result = GameResult.NAUGHT_WIN

        player1.final_result(final_result)
        player2.final_result(final_result)

        return final_result