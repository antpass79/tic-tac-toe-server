import { Server } from './server';

const port = process.env.LISTEN_PORT || 8080;

let server = new Server(port);
server.start();