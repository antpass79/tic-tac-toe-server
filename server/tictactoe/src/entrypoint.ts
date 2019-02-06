import { Server } from './server';

const port = process.env.LISTEN_PORT || 3000;

let server = new Server(port);
server.start();