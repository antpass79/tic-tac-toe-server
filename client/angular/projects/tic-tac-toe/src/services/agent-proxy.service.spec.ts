import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { range } from 'underscore';

import { AgentProxyService } from './agent-proxy.service';
import { Side } from '../redux/implementation/states';
import { GameResult, Board } from '../game/board';
import { GameStoreProvider } from '../redux/implementation/providers';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NicknameStoreService } from './nickname-store.service';
import { IAppConfig } from '../app/app.config';
import { MockAppConfig } from '../mock/mock-app-config';

describe('AgentProxyService', () => {

    let service: AgentProxyService;
    let mockController: HttpTestingController;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientModule
            ],
            providers: [
                {
                    provide: IAppConfig,
                    useClass: MockAppConfig
                },
                NicknameStoreService,
                {
                    provide: AgentProxyService,
                    useClass: AgentProxyService,
                    deps: [HttpClient, NicknameStoreService, IAppConfig]
                },
                GameStoreProvider
            ]
        });

        service = TestBed.get(AgentProxyService);
        mockController = TestBed.get(HttpTestingController);
    }));

    afterEach(() => {
        mockController.verify();
    });

    it('should create AgentProxyService', () => {
        expect(service).toBeTruthy();
    });

    it('should return status 200 after a call to newGame', () => {

        const side = Side.CROSS;

        service.newGame(side).subscribe((status) => {

            expect(status).toBe(side);
        });

        const req = mockController.expectOne('http://localhost:3000/tictactoe/newgame');

        expect(req.request.method).toEqual('POST');

        req.flush(side);
    });

    it('should return status 200 after a call to move', () => {

        let state = range(Board.BOARD_SIZE).map(() => { return Side.EMPTY; });
        state[1] = Side.NAUGHT;

        service.move(state).subscribe((status) => {
            expect(status).toContain(Side.NAUGHT);
        });

        const req = mockController.expectOne('http://localhost:3000/tictactoe/move');

        expect(req.request.method).toEqual('POST');

        req.flush(state);
    });

    it('should return status 200 after a call to endGame', () => {

        const gameResult = GameResult.CROSS_WIN;

        service.endGame(gameResult).subscribe((status) => {

            expect(status).toBe(gameResult);
        });

        const req = mockController.expectOne('http://localhost:3000/tictactoe/endgame');

        expect(req.request.method).toEqual('POST');

        req.flush(gameResult);
    });
})