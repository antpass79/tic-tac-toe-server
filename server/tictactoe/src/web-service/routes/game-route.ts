import * as express from "express";
import { GameController } from "../controllers/game-controller";

export class GameRoute {

    private gameController = new GameController();

    initRoute(app: express.Application): express.Router {

        const router = express.Router()
        router.post('/newgame', this.gameController.newGame);
        router.post('/move', this.gameController.move);
        router.post('/endgame', this.gameController.endGame);

        return router;
    }
}
