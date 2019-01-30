import tensorflow as tf

from Match import Match
from Board import Board, CROSS, NAUGHT, GameResult

from players.RandomPlayer import RandomPlayer
from players.TabularQPlayer import TQPlayer
from players.SimpleNNQPlayer import NNQPlayer
from players.DirectPolicyAgent import DirectPolicyAgent

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
        self.agent_player = TQPlayer()
        self.human_simulator = RandomPlayer()

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

        if self.agent_player.side == None:
            self.agent_player.new_game(CROSS)
            self.human_simulator.new_game(CROSS if self.agent_player.side == NAUGHT else NAUGHT)

        cross_count1, naught_count1, draw_count1 = self.match.play(self.human_simulator, self.agent_player, num_games)
        cross_count2, naught_count2, draw_count2 = self.match.play(self.agent_player, self.human_simulator, num_games)

        double_num_games = 2 * num_games
        cross_count = cross_count1 + cross_count2
        naught_count = naught_count1 + naught_count2
        draw_count = draw_count1 + draw_count2

        print("After {} game we have draws: {}, Player 1 wins: {}, and Player 2 wins: {}.".format(double_num_games, draw_count, cross_count, naught_count))
        print("Which gives percentages of draws: {:.2%}, Player 1 wins: {:.2%}, and Player 2 wins:  {:.2%}".format(draw_count / double_num_games, cross_count / double_num_games, naught_count / double_num_games))

        return Statistics(double_num_games, cross_count, naught_count, draw_count)

