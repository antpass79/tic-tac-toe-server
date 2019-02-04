import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { BoardComponent } from '../components/board/board.component';
import { CellComponent } from '../components/cell/cell.component';
import { GameStoreProvider } from '../redux/implementation/providers';
import { Logger, LoggerFactory } from '../redux/logger';
import { AppConfig } from './app.config';

@NgModule({
    declarations: [
        TicTacToeComponent,
        BoardComponent,
        CellComponent
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
        GameStoreProvider,
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [AppConfig],
            multi: true
        }
    ],
    bootstrap: [TicTacToeComponent]
})
export class TicTacToeModule {
}

export function ConfigLoader(appConfig: AppConfig) {
    return () => appConfig.load('./assets/config.json');
}
