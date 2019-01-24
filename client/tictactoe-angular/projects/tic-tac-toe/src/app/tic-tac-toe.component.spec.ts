import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { GameGridComponent } from '../components/game-grid/game-grid.component';
import { GameCellComponent } from '../components/game-grid/game-cell/game-cell.component';
import { Logger, LoggerFactory } from '../redux/logger';
import { Injector, APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { ConfigLoader, baseRobotServiceFactory } from './tic-tac-toe.module';
import { BaseRobotService } from '../services/robot.service';
import { WinService } from '../services/win.service';
import { GameStoreProvider } from '../redux/implementation/providers';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('TicTacToeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            TicTacToeComponent,
            GameGridComponent,
            GameCellComponent
        ],
        imports: [
            RouterTestingModule,
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
            GameStoreProvider
        ],
        }).compileComponents();
  }));
  
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(TicTacToeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});