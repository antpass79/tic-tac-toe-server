import { TestBed, async } from '@angular/core/testing';

import { BoardService } from './board.service';
import { Side } from '../redux/implementation/states';

describe('BoardService', () => {

    let service: BoardService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [BoardService]
        });

        service = TestBed.get(BoardService);
    }));

    it('should create BoardService', () => {
        expect(BoardService).toBeTruthy();
    });

    it('should have a default state Side.EMPTY for all elements', () => {

        expect(service.board.state).toEqual((<any>jasmine).arrayWithExactContents([Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY, Side.EMPTY]));
    });

    it('should return index equal to 3 from getIndex(1, 0)', () => {

        expect(BoardService.getIndex(1, 0)).toBe(3);
    });

    it('should return coordinate equal to (1, 0) from getCoordinate(3)', () => {

        expect(BoardService.getCoordinate(3)).toEqual({ x: 1, y: 0 });
    });
})