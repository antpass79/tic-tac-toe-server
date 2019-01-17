import unittest

from src.Board import Board, EMPTY, CROSS, NAUGHT
from src.players.RandomPlayer import RandomPlayer

class RandomPlayerTests(unittest.TestCase):

    def setUp(self):
        self.board = Board()
        self.player = RandomPlayer()

    def test_initialize_sideNone(self):
        self.assertEqual(self.player.side, None)

    def test_newGame_withCROSS(self):
        self.player.new_game(CROSS)
        self.assertEqual(self.player.side, CROSS)

    def test_newGame_withNAUGHT(self):
        self.player.new_game(NAUGHT)
        self.assertEqual(self.player.side, NAUGHT)

    def test_move_returnNotFinishedAfterCreation(self):
        self.player.new_game(CROSS)
        result, finished = self.player.move(self.board)
        self.assertEqual(finished, False)
