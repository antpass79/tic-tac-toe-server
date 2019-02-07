import { InjectionToken } from '@angular/core';

import { Store } from '../store';
import { LogMiddleware } from '../middlewares';
import { Logger } from '../logger';

import { GameState, initialState } from './states';
import { GameReducer } from './reducers';

export function createGameStore(logger: Logger): Store<GameState> {
    return new Store<GameState>(new GameReducer(), initialState, new LogMiddleware(logger));
}

export const GameStore = new InjectionToken('tic.tac.toe.store');

export const GameStoreProvider = [
    {
        deps: [Logger],
        provide: GameStore,
        useFactory: createGameStore
    },
];
