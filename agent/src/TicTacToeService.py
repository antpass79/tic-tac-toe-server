import tensorflow as tf
import numpy as np
import cherrypy

from TFSessionManager import TFSessionManager
from players.SimpleNNQPlayer import NNQPlayer
from Board import Board, CROSS, GameResult

player = NNQPlayer('NNQPlayer')
player.new_game(CROSS)

TFSessionManager.set_session(tf.Session())
TFSessionManager.get_session().run(tf.global_variables_initializer())

class TicTacToeService(object):

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def new(self):
        side = cherrypy.request.json
        player.new_game(side)

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
        game_result = cherrypy.request.json
        player.final_result(game_result)

        return game_result

if __name__ == '__main__':
   config = {'server.socket_host': '0.0.0.0'}
   cherrypy.config.update(config)
   cherrypy.quickstart(TicTacToeService())