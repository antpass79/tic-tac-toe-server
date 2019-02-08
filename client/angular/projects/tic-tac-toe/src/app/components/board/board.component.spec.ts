import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { CellComponent } from '../cell/cell.component';
import { appReducer } from '../../store/reducers/app.reducer';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('BoardComponent', () => {

    let component: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                BoardComponent,
                CellComponent
            ],
            imports: [
                FormsModule,
                HttpClientModule,
                StoreModule.forRoot(appReducer)
            ],
            providers: [
            ]
        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(BoardComponent);
            component = fixture.componentInstance;
        });
    }));

    it('should create the BoardComponent', async(() => {
        expect(component).toBeTruthy();
    }));
})