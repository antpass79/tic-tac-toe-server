import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { BoardComponent } from '../components/board/board.component';
import { CellComponent } from '../components/cell/cell.component';
import { GameStoreProvider } from '../redux/implementation/providers';
import { Logger, LoggerFactory } from '../redux/logger';
import { IAppConfig, AppConfig, ConfigLoader } from './app.config';
import { NicknameInterceptor } from '../services/nickname.interceptor';
import { NicknameStoreService } from '../services/nickname-store.service';

@NgModule({
    declarations: [
        TicTacToeComponent,
        BoardComponent,
        CellComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        {
            provide: Logger,
            useFactory: LoggerFactory,
            deps: [Injector]
        },
        GameStoreProvider,
        {
            provide: IAppConfig,
            useClass: AppConfig
        },
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [IAppConfig],
            multi: true
        },
        NicknameStoreService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NicknameInterceptor,
            deps: [NicknameStoreService],
            multi: true
        }
    ],
    bootstrap: [TicTacToeComponent]
})
export class TicTacToeModule {
}
