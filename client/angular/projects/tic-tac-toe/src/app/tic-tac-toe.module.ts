import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { BoardComponent } from '../components/board/board.component';
import { CellComponent } from '../components/cell/cell.component';

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
    ],
    bootstrap: [TicTacToeComponent]
})
export class TicTacToeModule {
}
