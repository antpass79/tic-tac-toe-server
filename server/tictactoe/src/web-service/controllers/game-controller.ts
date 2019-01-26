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

        let side = req.body;
        console.log(side);

        let agentService = new AgentService();
        agentService.newGame(side).subscribe((data) => {
            res.sendStatus(200);
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
        console.log(state);
        
        let board = new Board();
        board.updateState(state);

        let agentService = new AgentService();
        agentService.move(board).subscribe((updatedState: number[]) => {
            console.log(state);
            res.send(updatedState);
        }, (e) => {
            res.sendStatus(500);
        });
    }

    // how to use it:
    // call 'http://localhost:3000/tictactoe/endgame'
    // POST, Content-Type: application/json, Body: {
    //     "result": 1
    //     }
    endGame(req: any, res: any) {

        let gameResult = req.body;

        let agentService = new AgentService();
        agentService.end(gameResult).subscribe((data) => {
            res.sendStatus(200);
        }, (e) => {
            res.sendStatus(500);
        });
    }
}