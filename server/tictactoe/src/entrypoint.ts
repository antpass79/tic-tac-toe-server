import { Server } from './server';

console.log('process.env.LISTEN_PORT ' + process.env.LISTEN_PORT);
const port = process.env.LISTEN_PORT || 3000;

let server = new Server(port);
server.start();