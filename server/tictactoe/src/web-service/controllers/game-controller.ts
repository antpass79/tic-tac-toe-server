import { AgentProxy } from '../../game/agent-proxy';
import { Board } from '../../game/board';

export class GameController {

    // how to use it:
    // call 'http://localhost:3000/tictactoe/nickname'
    // POST, Content-Type: application/json, Body: {
    //     "nickname": "user"
    //     }
    nickname(req: any, res: any) {

        let jsonData = req.body;

        let agentProxy = new AgentProxy(req.get('Nickname'));
        agentProxy.nickname(jsonData.nickname).subscribe((data) => {
            res.send(JSON.stringify(data));
        }, (e) => {
            res.sendStatus(500);
        });
    }

    // how to use it:
    // call 'http://localhost:3000/tictactoe/newgame'
    // POST, Content-Type: application/json, Body: {
    //     "side": 1
    //     }
    newGame(req: any, res: any) {

        let jsonData = req.body;

        let agentProxy = new AgentProxy(req.get('Nickname'));
        agentProxy.newGame(jsonData.side).subscribe((data) => {
            res.send(JSON.stringify(data));
        }, (e) => {
            res.sendStatus(500);
        });
    }

    // how to use it:
    // call 'http://localhost:3000/tictactoe/move'
    // POST, Content-Type: application/json, Body: {
    //     "state": [0, 0, 1, 1, 2, 2, 0, 1, 2]
    //     }
    move(req: any, res: any) {

        let state = req.body;
        
        let board = new Board();
        board.updateState(state);

        let agentProxy = new AgentProxy(req.get('Nickname'));
        agentProxy.move(board).subscribe((updatedState: number[]) => {
            res.send(updatedState);
        }, (e) => {
            res.sendStatus(500);
        });
    }

    // how to use it:
    // call 'http://localhost:3000/tictactoe/endgame'
    // POST, Content-Type: application/json, Body: {
    //     "gameResult": 1
    //     }
    endGame(req: any, res: any) {

        let jsonData = req.body;

        let agentProxy = new AgentProxy(req.get('Nickname'));
        agentProxy.endGame(jsonData.gameResult).subscribe((data) => {
            res.send(JSON.stringify(data));
        }, (e) => {
            res.sendStatus(500);
        });
    }

    // how to use it:
    // call 'http://localhost:3000/tictactoe/train'
    // POST, Content-Type: application/json, Body: {
    //     "side": 1
    //     }
    train(req: any, res: any) {

        let jsonData = req.body;

        let agentProxy = new AgentProxy(req.get('Nickname'));
        agentProxy.train(jsonData.games).subscribe((data) => {
            res.send(JSON.stringify(data));
        }, (e) => {
            res.sendStatus(500);
        });
    }

    // how to use it:
    // call 'http://localhost:3000/tictactoe/clean'
    // POST, Content-Type: application/json
    clean(req: any, res: any) {

        let agentProxy = new AgentProxy(req.get('Nickname'));
        agentProxy.clean().subscribe((data) => {
            res.send(JSON.stringify(data));
        }, () => {
            res.sendStatus(500);
        });
    }

    // how to use it:
    // call 'http://localhost:3000/tictactoe/ping'
    // GET, Content-Type: application/json
    ping(req: any, res: any) {

        try {
            let agentProxy = new AgentProxy("NO NICKNAME");
            agentProxy.ping().subscribe((data) => {
                res.send(JSON.stringify(data));
            }, () => {
                res.send(JSON.stringify("Ping OK!"));
            });    
        }
        catch (error) {
            res.send(JSON.stringify("Ping OK with error " + error + "!"));
        }
    }
}