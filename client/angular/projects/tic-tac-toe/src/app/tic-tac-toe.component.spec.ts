import { async, TestBed } from '@angular/core/testing';
import { TicTacToeComponent } from './tic-tac-toe.component';

describe('TicTacToeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            TicTacToeComponent
        ]
        }).compileComponents();
  }));
  
  it('should create TicTacToeComponent', async(() => {
    const fixture = TestBed.createComponent(TicTacToeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});