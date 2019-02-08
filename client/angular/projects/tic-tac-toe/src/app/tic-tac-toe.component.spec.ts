import { async, TestBed } from '@angular/core/testing';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { BoardComponent } from './components/board/board.component';
import { CellComponent } from './components/cell/cell.component';
import { Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NicknameStoreService } from './services/nickname-store.service';
import { IAppConfig } from './app.config';
import { NicknameInterceptor } from './services/nickname.interceptor';
import { MockAppConfig } from '../mock/mock-app-config';
import { appReducer } from './store/reducers/app.reducer';
import { StoreModule } from '@ngrx/store';

describe('TicTacToeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TicTacToeComponent,
        BoardComponent,
        CellComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot(appReducer)
      ],
      providers: [
      {
          provide: IAppConfig,
          useClass: MockAppConfig
      },
      NicknameStoreService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: NicknameInterceptor,
          deps: [NicknameStoreService],
          multi: true
      }
    ]
    }).compileComponents();
  }));

  it('should create TicTacToeComponent', async(() => {
    const fixture = TestBed.createComponent(TicTacToeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});