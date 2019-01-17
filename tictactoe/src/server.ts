import express from 'express';

export class Server {

    private _port: number | string;
    get port() {
        return this._port;
    }

    private _app: express.Application;

    constructor(port: number | string) {
        this._port = port;

        this._app = express();
    }

    start() {

        this._app.listen(this.port, () => {


        });
    }
}