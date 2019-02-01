import numpy as np
import cherrypy
import json

from Board import GameResult
from GameSimulator import GameSimulator

class TicTacToeService(object):

    def __init__(self):
        self.game_simulator = GameSimulator()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def new(self):
        side = cherrypy.request.json

        result = self.game_simulator.new_game(side)
        return result

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def move(self):
        json_input = cherrypy.request.json
        state = np.array(json_input['_state']).astype(int)

        result = self.game_simulator.move(state)
        return result.tolist()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def end(self):
        game_result_json = cherrypy.request.json
        game_result = GameResult(game_result_json)

        result = self.game_simulator.end_game(game_result)
        return game_result_json

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def train(self):
        num_games = cherrypy.request.json
        statistics = self.game_simulator.train(num_games)

        jsonStatistics = json.dumps(statistics.__dict__)
        return jsonStatistics

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def clean(self):
        result = cherrypy.request.json

        self.game_simulator.clean()
        self.game_simulator = GameSimulator()

        return result

if __name__ == '__main__':
   config = {'server.socket_host': '0.0.0.0'}
   cherrypy.config.update(config)
   cherrypy.quickstart(TicTacToeService())
