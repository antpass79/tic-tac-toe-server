import tensorflow as tf
import numpy as np
import cherrypy
import json

from TFSessionManager import TFSessionManager
from players.SimpleNNQPlayer import NNQPlayer
from players.TabularQPlayer import TQPlayer
from players.RandomPlayer import RandomPlayer
from Board import Board, CROSS, NAUGHT, GameResult
from Match import Match

match = Match()

agentPlayer = TQPlayer()
# player = NNQPlayer('NNQPlayer')
agentPlayer.new_game(CROSS)

humanSimulatedPlayer = TQPlayer()
# humanSimulatedPlayer = NNQPlayer('HumanSimulatedPlayer')
humanSimulatedPlayer.new_game(NAUGHT)

TFSessionManager.set_session(tf.Session())
TFSessionManager.get_session().run(tf.global_variables_initializer())

class Statistics(object):
    def __init__(self, games: int, cross_count: int, naught_count: int, draw_count: int):
        self.games = games
        self.cross_count = cross_count
        self.naught_count = naught_count
        self.draw_count = draw_count

class TicTacToeService(object):

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def new(self):
        side = cherrypy.request.json
        agentPlayer.new_game(side)
        humanSimulatedPlayer.new_game(CROSS if agentPlayer.side == NAUGHT else NAUGHT)

        print("agentPlayer.side {}".format(agentPlayer.side))
        print('CROSS' if agentPlayer.side == CROSS else ('NAUGHT' if agentPlayer.side == NAUGHT else 'INVALID SIDE'))

        return agentPlayer.side

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def move(self):
        json_input = cherrypy.request.json
        state = np.array(json_input['_state']).astype(int)
        board = Board(state=state)
        gameResult, finished = agentPlayer.move(board)
        board.print_board()

        return board.state.tolist()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def end(self):
        game_result_json = cherrypy.request.json
        game_result = GameResult(game_result_json)
        agentPlayer.final_result(game_result)

        print("game_result {}".format(game_result))
        print('CROSS_WIN' if game_result == GameResult.CROSS_WIN else ('NAUGHT_WIN' if game_result == GameResult.NAUGHT_WIN else ('DRAW' if game_result == GameResult.DRAW else ('NOT_FINISHED' if game_result == GameResult.NOT_FINISHED else 'INVALID GAME_RESULT'))))

        return game_result_json

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def train(self):

        if Match.is_playing:
            return json.dumps(Statistics(0, 0, 0, 0).__dict__)

        games = cherrypy.request.json
        
        cross_count, naught_count, draw_count = match.play(humanSimulatedPlayer, agentPlayer, games)

        statistics = Statistics(games, cross_count, naught_count, draw_count)
        jsonStatistics = json.dumps(statistics.__dict__)
        print(jsonStatistics)

        return jsonStatistics

if __name__ == '__main__':
   config = {'server.socket_host': '0.0.0.0'}
   cherrypy.config.update(config)
   cherrypy.quickstart(TicTacToeService())