import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { CellComponent } from './cell.component';

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
});