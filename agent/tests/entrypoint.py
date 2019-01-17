import unittest

from tests.players.RandomPlayer import RandomPlayerTests

# Run tests

# method 1
# if __name__ == '__main__':
#     unittest.main()

# method 2
suite = unittest.TestLoader().loadTestsFromTestCase(RandomPlayerTests)
unittest.TextTestRunner(verbosity=2).run(suite)