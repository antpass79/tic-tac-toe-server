import cherrypy

class TicTacToeService(object):

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def new(self):
        return 'New'

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def move(self):
        return 'Move'

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def end(self):
        return 'End'

if __name__ == '__main__':
   config = {'server.socket_host': '0.0.0.0'}
   cherrypy.config.update(config)
   cherrypy.quickstart(TicTacToeService())