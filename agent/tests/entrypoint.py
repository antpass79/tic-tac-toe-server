import unittest

from tests.Board import BoardTests
from tests.players.RandomPlayer import RandomPlayerTests
from tests.players.SimpleNNQPlayer import SimpleNNQPlayerTests
from tests.Match import MatchTests
# Run tests

# method 1
# if __name__ == '__main__':
#     unittest.main()

# method 2
suite1 = unittest.TestLoader().loadTestsFromTestCase(BoardTests)
suite2 = unittest.TestLoader().loadTestsFromTestCase(RandomPlayerTests)
suite3 = unittest.TestLoader().loadTestsFromTestCase(SimpleNNQPlayerTests)
suite4 = unittest.TestLoader().loadTestsFromTestCase(MatchTests)
allTests = unittest.TestSuite([suite1, suite2, suite3, suite4])
unittest.TextTestRunner(verbosity=2).run(allTests)