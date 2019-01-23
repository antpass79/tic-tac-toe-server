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

        let data = req.body;

        let agentService = new AgentService();
        agentService.newGame(data.side).subscribe((data) => {
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

        let data = req.body;
        console.log(data);
        
        let board = new Board();
        board.updateState(data.state);

        let agentService = new AgentService();
        agentService.move(board).subscribe((updatedState: number[]) => {
            console.log(data);
            res.send(updatedState);
        }, (e) => {
            res.sendStatus(500);
        });
    }

    // how to use it:
    // call 'http://localhost:3000/tictactoe/end'
    // POST, Content-Type: application/json, Body: {
    //     "result": 1
    //     }
    end(req: any, res: any) {

        let data = req.body;

        let agentService = new AgentService();
        agentService.end(data.result).subscribe((data) => {
            res.sendStatus(200);
        }, (e) => {
            res.sendStatus(500);
        });
    }
}