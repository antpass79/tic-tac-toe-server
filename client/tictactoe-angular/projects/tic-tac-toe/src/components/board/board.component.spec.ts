import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

import { BoardComponent } from './board.component';
import { CellComponent } from '../cell/cell.component';

describe('BoardComponent', () => {

    let component: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                BoardComponent,
                CellComponent
            ]
        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(BoardComponent);
            component = fixture.componentInstance;
        });
    }));

    it('should create the BoardComponent', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should have 9 cells', () => {

        fixture.detectChanges();
        let cells = fixture.debugElement.queryAll(By.css('cell'));
        expect(cells.length).toEqual(9);
      });

    // it('should have 9 cells', async(() => {
    //     spyOn(component, 'onCellClick');
      
    //     let cells = fixture.debugElement.queryAll(By.css('cell'));
    //     cells[0].name.forEach((cell) => cell.click());
      
    //     fixture.whenStable().then(() => {
    //       expect(component.onCellClick).toHaveBeenCalled();
    //     });
    //   }));    
})