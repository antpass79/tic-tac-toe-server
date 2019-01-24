import { TestBed, async, ComponentFixture } from '@angular/core/testing';

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

    it('should create the BoardComponent', async(() => {
        expect(component.cells.length).toEqual(9);
    }));
})