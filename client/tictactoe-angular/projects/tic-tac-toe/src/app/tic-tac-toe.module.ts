import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { GameGridComponent } from '../components/game-grid/game-grid.component';
import { GameCellComponent } from '../components/game-grid/game-cell/game-cell.component';
import { GameStoreProvider } from '../redux/implementation/providers';
import { Logger, LoggerFactory } from '../redux/logger';
import { AppConfig } from './app.config';
import { BaseRobotService, RobotMockService, RobotService } from '../services/robot.service';
import { GameFlowService } from '../services/game-flow.service';
import { WinService } from '../services/win.service';

@NgModule({
    declarations: [
        TicTacToeComponent,
        GameGridComponent,
        GameCellComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [
        {
            provide: Logger,
            useFactory: LoggerFactory,
            deps: [Injector]
        },
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [AppConfig],
            multi: true
        },
        {
            provide: BaseRobotService,
            useFactory: baseRobotServiceFactory,
            deps: [Injector]
        },
        WinService,
        GameStoreProvider,
        GameFlowService
    ],
    bootstrap: [TicTacToeComponent]
})
export class TicTacToeModule {
}

export function ConfigLoader(appConfig: AppConfig) {
    return function () {
        return appConfig.load('../assets/config.json');
    };
}

export function baseRobotServiceFactory(injector: Injector): BaseRobotService {

    let httpClient = injector.get(HttpClient) as HttpClient;
    let appConfig = injector.get(AppConfig) as AppConfig;

    let robotService: BaseRobotService;
    if (appConfig.getValue("mock"))
        robotService = new RobotMockService(httpClient);
    else
        robotService = new RobotService(httpClient);

    return robotService;
}
