import { range } from 'underscore';

export class Constants {

    public static get BOARD_DIM(): number { return 3; };
    public static get BOARD_SIZE(): number { return Constants.BOARD_DIM * Constants.BOARD_DIM; };
}

export enum Side {
    
    EMPTY = 0,
    CROSS = 1,
    NAUGHT = 2
}

export interface CellState {

    readonly x: number;
    readonly y: number;
    readonly side: Side;
}

export interface BoardState {

    readonly cells: CellState[];
}

export interface GameState {

    readonly boardState: BoardState;
}

export const initialState: GameState = {

    boardState: {
        cells: range(Constants.BOARD_SIZE).map(() => {
            return {
                x: 0,
                y: 0,
                side: Side.EMPTY
            };
        })
    }
}