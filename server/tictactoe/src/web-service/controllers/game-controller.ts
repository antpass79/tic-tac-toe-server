import Axios, * as axios from 'axios';
import { AgentService } from '../../game/players/agent-service';
import { Side } from '../../game/players/player';
import { Board } from '../../game/board';

export class GameController {

    // how to use it:
    // call 'http://localhost:3000/tictactoe/newgame'
    // POST, Content-Type: application/json, Body: {
    //     "side": 1
    //     }
    newGame(req: any, res: any) {

        let jsonData = req.body;

        let agentService = new AgentService();
        agentService.newGame(jsonData.side).subscribe((data) => {
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

        let agentService = new AgentService();
        agentService.move(board).subscribe((updatedState: number[]) => {
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

        let agentService = new AgentService();
        agentService.endGame(jsonData.gameResult).subscribe((data) => {
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
    train(req: any, res: any) {

        let jsonData = req.body;

        let agentService = new AgentService();
        agentService.train(jsonData.games).subscribe((data) => {
            res.send(JSON.stringify(data));
        }, (e) => {
            res.sendStatus(500);
        });
    }

    // how to use it:
    // call 'http://localhost:3000/tictactoe/clean'
    // POST, Content-Type: application/json
    clean(req: any, res: any) {

        let agentService = new AgentService();
        agentService.clean().subscribe((data) => {
            res.send(JSON.stringify(data));
        }, () => {
            res.sendStatus(500);
        });
    }
}