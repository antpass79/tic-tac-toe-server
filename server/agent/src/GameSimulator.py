import tensorflow as tf

from Match import Match
from Board import Board, CROSS, NAUGHT, GameResult

from players.RandomPlayer import RandomPlayer
from players.TabularQPlayer import TQPlayer
from players.SimpleNNQPlayer import NNQPlayer

from TFSessionManager import TFSessionManager

class Statistics(object):
    def __init__(self, games: int, cross_count: int, naught_count: int, draw_count: int):
        self.games = games
        self.cross_count = cross_count
        self.naught_count = naught_count
        self.draw_count = draw_count

class GameSimulator:

    def __init__(self):
        self.match = Match()
        self.agent_player = NNQPlayer('NNQPlayer')
        self.agent_player.new_game(CROSS)
        self.human_simulator = RandomPlayer()
        self.human_simulator.new_game(NAUGHT)

        TFSessionManager.set_session(tf.Session())
        TFSessionManager.get_session().run(tf.global_variables_initializer())


    def new_game(self, side: int) -> int:
        self.agent_player.new_game(side)
        self.human_simulator.new_game(CROSS if self.agent_player.side == NAUGHT else NAUGHT)

        print("agent_player.side {}".format(self.agent_player.side))
        print('CROSS' if self.agent_player.side == CROSS else ('NAUGHT' if self.agent_player.side == NAUGHT else 'INVALID SIDE'))

        return self.agent_player.side

    def move(self, state):
        board = Board(state)
        game_result, finished = self.agent_player.move(board)
        board.print_board()

        print("game_result {}".format(game_result))
        print('CROSS_WIN' if game_result == GameResult.CROSS_WIN else ('NAUGHT_WIN' if game_result == GameResult.NAUGHT_WIN else ('DRAW' if game_result == GameResult.DRAW else ('NOT_FINISHED' if game_result == GameResult.NOT_FINISHED else 'INVALID GAME_RESULT'))))

        return board.state

    def end_game(self, game_result: GameResult):
        self.agent_player.final_result(game_result)

        print("game_result {}".format(game_result))
        print('CROSS_WIN' if game_result == GameResult.CROSS_WIN else ('NAUGHT_WIN' if game_result == GameResult.NAUGHT_WIN else ('DRAW' if game_result == GameResult.DRAW else ('NOT_FINISHED' if game_result == GameResult.NOT_FINISHED else 'INVALID GAME_RESULT'))))

    def train(self, num_games: int):
        side = self.agent_player.side
        cross_count, naught_count, draw_count = self.match.play(self.human_simulator, self.agent_player, num_games)
        # cross_count, naught_count, draw_count = self.match.play(self.agent_player, self.human_simulator, num_games)
        self.agent_player.side = side
        self.human_simulator.side = CROSS if self.agent_player.side == NAUGHT else NAUGHT

        print("After {} game we have draws: {}, Player 1 wins: {}, and Player 2 wins: {}.".format(num_games, draw_count, cross_count, naught_count))
        print("Which gives percentages of draws: {:.2%}, Player 1 wins: {:.2%}, and Player 2 wins:  {:.2%}".format(draw_count / num_games, cross_count / num_games, naught_count / num_games))

        return Statistics(num_games, cross_count, naught_count, draw_count)

