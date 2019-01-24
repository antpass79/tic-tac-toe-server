import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

import { CellComponent, CellState } from './cell.component';

describe('CellComponent', () => {

    let component: CellComponent;
    let fixture: ComponentFixture<CellComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CellComponent
            ]
        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(CellComponent);
            component = fixture.componentInstance;
        });
    }));

    it('should create the CellComponent', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should have index equal to -1 after creation', async(() => {
        expect(component.index).toEqual(-1);
    }));

    it('should have index equal to 0 with new CellState(0, 0)', async(() => {
        component.state = new CellState(0, 0);
        expect(component.index).toEqual(0);
    }));

    it('should have index equal to 8 with CellState(2, 2)', async(() => {
        component.state = new CellState(2, 2);
        expect(component.index).toEqual(8);
    }));

    it('should have index equal to 7 with CellState(2, 1)', async(() => {
        component.state = new CellState(2, 1);
        expect(component.index).toEqual(7);
    }));
})