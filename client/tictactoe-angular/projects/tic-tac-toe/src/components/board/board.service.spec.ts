import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { BoardService } from './board.service';

describe('BoardService', () => {

    let service: BoardService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [BoardService]
        });

        service = TestBed.get(BoardService);
    }));

    it('should be created', () => {
        expect(BoardService).toBeTruthy();
    });

    it('should have a default state [0, 0, 0, 0, 0, 0, 0, 0, 0]', async(() => {

        expect(service.state).toEqual((<any>jasmine).arrayWithExactContents([0, 0, 0, 0, 0, 0, 0, 0, 0]));
    }));
})