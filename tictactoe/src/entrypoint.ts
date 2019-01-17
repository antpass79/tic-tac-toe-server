import { Server } from './server';

const port = process.env.PORT || 3000;

let server = new Server(port);
server.start();

console.log('Server listening on port ' + server.port);