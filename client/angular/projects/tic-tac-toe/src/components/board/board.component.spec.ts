import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { CellComponent } from '../cell/cell.component';
import { GameStoreProvider } from '../../redux/implementation/providers';
import { Logger, LoggerFactory } from '../../redux/logger';
import { Injector } from '@angular/core';

describe('BoardComponent', () => {

    let component: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                BoardComponent,
                CellComponent
            ],
            providers: [
                {
                    provide: Logger,
                    useFactory: LoggerFactory,
                    deps: [Injector]
                },
                GameStoreProvider
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