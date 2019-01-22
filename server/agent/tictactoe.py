import cherrypy

class Processor:

    def __init__(self):
        self.value = 0

    def add(self):
        self.value += 1
        return self.value

    def run(self, numbers):
        return numbers


processor = Processor()

class TicTacToeService(object):

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def process(self):
        data = cherrypy.request.json
        result = processor.run(data)
        return result

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def add(self):
        result = processor.add()
        return result

if __name__ == '__main__':
   config = {'server.socket_host': '0.0.0.0'}
   cherrypy.config.update(config)
   cherrypy.quickstart(TicTacToeService())