import numpy as np
import cherrypy
import json

from Board import GameResult
from GameSimulator import GameSimulator

class GameSession(object):

    def __init__(self):
        self.games = {}

    def get_game(self, key: str) -> GameSimulator:
        return self.games[key]

    def set_game(self, key: str, gameSimulator: GameSimulator):
        self.games[key] = gameSimulator

    def exists(self, key: str) -> bool:
        return key in self.games

class TicTacToeService(object):

    def __init__(self):
        self.games = GameSession()
        self.game_simulator = GameSimulator()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def nickname(self):

        nickname = cherrypy.request.json
        print ('nickname')
        print (nickname)
        if self.games.exists(nickname):
            raise cherrypy.HTTPError(message='Invalid nickname')

        self.games.set_game(nickname, GameSimulator())

        return nickname

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def new(self):

        side = cherrypy.request.json

        nickname = cherrypy.request.headers['Nickname']
        game_simulator = self.games.get_game(nickname)
        result = game_simulator.new_game(side)
        return result

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def move(self):
        json_input = cherrypy.request.json
        state = np.array(json_input['_state']).astype(int)

        nickname = cherrypy.request.headers['Nickname']
        game_simulator = self.games.get_game(nickname)
        result = game_simulator.move(state)
        return result.tolist()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def end(self):
        game_result_json = cherrypy.request.json
        game_result = GameResult(game_result_json)

        nickname = cherrypy.request.headers['Nickname']
        game_simulator = self.games.get_game(nickname)
        game_simulator.end_game(game_result)
        return game_result_json

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def train(self):
        num_games = cherrypy.request.json

        nickname = cherrypy.request.headers['Nickname']
        game_simulator = self.games.get_game(nickname)
        statistics = game_simulator.train(num_games)

        jsonStatistics = json.dumps(statistics.__dict__)
        return jsonStatistics

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def clean(self):
        result = cherrypy.request.json

        nickname = cherrypy.request.headers['Nickname']
        game_simulator = self.games.get_game(nickname)
        game_simulator.clean()
        game_simulator = GameSimulator()

        return result

if __name__ == '__main__':
   config = {'server.socket_host': '0.0.0.0'}
   cherrypy.config.update(config)
   cherrypy.quickstart(TicTacToeService())
