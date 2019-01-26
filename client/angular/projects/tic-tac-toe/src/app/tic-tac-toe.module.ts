import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { BoardComponent } from '../components/board/board.component';
import { CellComponent } from '../components/cell/cell.component';
import { GameStoreProvider } from '../redux/implementation/providers';
import { Logger, LoggerFactory } from '../redux/logger';

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
        GameStoreProvider
    ],
    bootstrap: [TicTacToeComponent]
})
export class TicTacToeModule {
}
