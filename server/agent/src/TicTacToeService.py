import tensorflow as tf
import numpy as np
import cherrypy
import json

from TFSessionManager import TFSessionManager
from players.SimpleNNQPlayer import NNQPlayer
from players.RandomPlayer import RandomPlayer
from Board import Board, CROSS, NAUGHT, GameResult
from Match import Match

player = NNQPlayer('NNQPlayer')
player.new_game(CROSS)

player2 = NNQPlayer('NNQPlayer2')
player2.new_game(NAUGHT)

TFSessionManager.set_session(tf.Session())
TFSessionManager.get_session().run(tf.global_variables_initializer())

class TicTacToeService(object):

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def new(self):
        side = cherrypy.request.json
        player.new_game(side)

        print("player.side {}".format(player.side))
        print('CROSS' if player.side == CROSS else ('NAUGHT' if player.side == NAUGHT else 'INVALID SIDE'))

        return player.side

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def move(self):
        json_input = cherrypy.request.json
        state = np.array(json_input['_state']).astype(int)
        board = Board(state=state)
        gameResult, finished = player.move(board)
        board.print_board()

        return board.state.tolist()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def end(self):
        game_result_json = cherrypy.request.json
        game_result = GameResult(game_result_json)
        player.final_result(game_result)

        print("game_result {}".format(game_result))
        # print('CROSS_WIN' if game_result == GameResult.CROSS_WIN else 'NAUGHT_WIN')
        print('CROSS_WIN' if game_result == GameResult.CROSS_WIN else ('NAUGHT_WIN' if game_result == GameResult.NAUGHT_WIN else ('DRAW' if game_result == GameResult.DRAW else ('NOT_FINISHED' if game_result == GameResult.NOT_FINISHED else 'INVALID GAME_RESULT'))))

        return game_result_json

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def train(self):
        games = cherrypy.request.json

        match = Match()
        match.play(player2, player, games)

        return games

if __name__ == '__main__':
   config = {'server.socket_host': '0.0.0.0'}
   cherrypy.config.update(config)
   cherrypy.quickstart(TicTacToeService())