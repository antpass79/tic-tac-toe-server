import { async, TestBed } from '@angular/core/testing';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { BoardComponent } from '../components/board/board.component';
import { CellComponent } from '../components/cell/cell.component';
import { GameStoreProvider } from '../redux/implementation/providers';
import { Injector } from '@angular/core';
import { LoggerFactory, Logger } from '../redux/logger';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('TicTacToeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TicTacToeComponent,
        BoardComponent,
        CellComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {
          provide: Logger,
          useFactory: LoggerFactory,
          deps: [Injector]
        },
        GameStoreProvider
      ]
    }).compileComponents();
  }));

  it('should create TicTacToeComponent', async(() => {
    const fixture = TestBed.createComponent(TicTacToeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});