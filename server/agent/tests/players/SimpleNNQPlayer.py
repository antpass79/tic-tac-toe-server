import unittest

import tensorflow as tf

from src.Board import Board, EMPTY, CROSS, NAUGHT
from src.players.SimpleNNQPlayer import NNQPlayer
from src.TFSessionManager import TFSessionManager

class SimpleNNQPlayerTests(unittest.TestCase):
    
    def setUp(self):
        TFSessionManager.set_session(tf.Session())

        self.board = Board()
        self.player = NNQPlayer('NNQPlayerTest')

    def tearDown(self):
        tf.keras.backend.clear_session()

    def test_initialize_sideNone(self):
        TFSessionManager.get_session().run(tf.global_variables_initializer())

        self.assertEqual(self.player.side, None)

    def test_newGame_withCROSS(self):
        TFSessionManager.get_session().run(tf.global_variables_initializer())

        self.player.new_game(CROSS)
        self.assertEqual(self.player.side, CROSS)

    def test_newGame_withNAUGHT(self):
        TFSessionManager.get_session().run(tf.global_variables_initializer())

        self.player.new_game(NAUGHT)
        self.assertEqual(self.player.side, NAUGHT)

    def test_move_returnNotFinishedAfterCreation(self):
        TFSessionManager.get_session().run(tf.global_variables_initializer())

        self.player.new_game(CROSS)
        result, finished = self.player.move(self.board)
        self.assertEqual(finished, False)
