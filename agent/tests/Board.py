import unittest
import numpy as np
from src.Board import Board, EMPTY, CROSS, NAUGHT, BOARD_SIZE

class BoardTests(unittest.TestCase):

    def setUp(self):
        self.board = Board()

    def test_initialize_state(self):

        equals = np.alltrue(self.board.state == [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY])

        self.assertEqual(equals, True)

    def test_move_not_finished_after_one_move(self):
        state, game_result, finished = self.board.move(self.board.random_empty_spot(), CROSS)
        self.assertEqual(finished, False)

    def test_move_finished_after_a_game(self):
        finished = False
        for i in range(9):
            state, game_result, finished = self.board.move(self.board.random_empty_spot(), CROSS)
        self.assertEqual(finished, True)
