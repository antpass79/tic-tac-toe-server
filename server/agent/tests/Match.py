import unittest
import numpy as np
import tensorflow as tf

from src.Match import Match
from src.Board import Board, GameResult, CROSS, NAUGHT
from src.players.RandomPlayer import RandomPlayer
from src.players.SimpleNNQPlayer import NNQPlayer
from src.TFSessionManager import TFSessionManager

class MatchTests(unittest.TestCase):
    
    def setUp(self):
        TFSessionManager.set_session(tf.Session())

        self.board = Board()
        self.nnq_player1 = NNQPlayer('NNQPlayerTest1')
        self.nnq_player2 = NNQPlayer('NNQPlayerTest2')

    def tearDown(self):
        tf.keras.backend.clear_session()

    def test_one_game_randomVSrandom(self):

        player1 = RandomPlayer()
        player2 = RandomPlayer()

        match = Match()
        game_result = match.game(player1, player2, self.board)

        self.assertNotIn(game_result, [GameResult.NOT_FINISHED])

    def test_play_10_games_randomVSrandom(self):

        board = Board()
        player1 = RandomPlayer()
        player2 = RandomPlayer()
        match = Match()

        cross_count, naught_count, draw_count = match.play(player1, player2, 10)

        self.assertGreaterEqual(cross_count, 0)
        self.assertGreaterEqual(naught_count, 0)
        self.assertGreaterEqual(draw_count, 0)

    def test_play_1000_games_nnqVSrandom(self):
        TFSessionManager.get_session().run(tf.global_variables_initializer())

        player = RandomPlayer()
        match = Match()

        self.nnq_player1.new_game(CROSS)
        player.new_game(NAUGHT)
        
        num_games = 10000

        cross_count, naught_count, draw_count = match.play(self.nnq_player1, player, num_games)

        print("After {} game we have draws: {}, Player 1 wins: {}, and Player 2 wins: {}.".format(num_games, draw_count, cross_count, naught_count))
        print("Which gives percentages of draws: {:.2%}, Player 1 wins: {:.2%}, and Player 2 wins:  {:.2%}".format(draw_count / num_games, cross_count / num_games, naught_count / num_games))

        self.assertGreaterEqual(cross_count, 0)
        self.assertGreaterEqual(naught_count, 0)
        self.assertGreaterEqual(draw_count, 0)

    # def test_play_10000_games_nnqVSrandom(self):
    #     TFSessionManager.get_session().run(tf.global_variables_initializer())

    #     match = Match()

    #     self.nnq_player1.new_game(CROSS)
    #     self.nnq_player2.new_game(NAUGHT)
        
    #     cross_count, naught_count, draw_count = match.play(self.nnq_player1, self.nnq_player2, 1000)

    #     self.assertEqual(cross_count, 0)
    #     self.assertEqual(naught_count, 0)
    #     self.assertGreaterEqual(draw_count, 0)