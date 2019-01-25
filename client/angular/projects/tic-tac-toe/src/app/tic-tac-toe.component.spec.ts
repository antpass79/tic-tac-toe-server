import { async, TestBed } from '@angular/core/testing';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { BoardComponent } from '../components/board/board.component';
import { CellComponent } from '../components/cell/cell.component';

describe('TicTacToeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            TicTacToeComponent,
            BoardComponent,
            CellComponent
        ]
        }).compileComponents();
  }));
  
  it('should create TicTacToeComponent', async(() => {
    const fixture = TestBed.createComponent(TicTacToeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});