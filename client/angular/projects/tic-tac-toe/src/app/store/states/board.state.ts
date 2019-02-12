import { range } from 'underscore';
import { BoardUtils } from '../../game/utils';

export enum Side {

    EMPTY = 0,
    NAUGHT = 1,
    CROSS = 2
}

export interface CellState {

    readonly x: number;
    readonly y: number;
    readonly side: Side;
}

export interface BoardState {

    readonly cells: CellState[];
    readonly errorMessage: string;
}

export const initialBoardState: BoardState = {

    cells: range(BoardUtils.BOARD_SIZE).map((item, index) => {

        let coordinate = BoardUtils.getCoordinate(index);
        return {
            x: coordinate.x,
            y: coordinate.y,
            side: Side.EMPTY
        }
    }),
    errorMessage: null
}

export function getInitialBoardState(): BoardState {
    return initialBoardState;
}