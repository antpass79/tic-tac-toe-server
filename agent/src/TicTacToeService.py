import cherrypy

from players.SimpleNNQPlayer import NNQPlayer

player = NNQPlayer('NNQPlayer')

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
        board = cherrypy.request.json
        result = player.move(board)

        return result

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