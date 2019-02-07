import { range } from 'underscore';
import { Board } from '../../game/board';

export enum Side {
    
    EMPTY = 0,
    NAUGHT = 1,
    CROSS = 2,
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

    readonly started: boolean;
    readonly busy: boolean;
    readonly winner: Side;
    readonly boardState: BoardState;
}

export const initialGameState: GameState = {

    started: false,
    busy: false,
    winner: Side.EMPTY,
    boardState: {
        cells: range(Board.BOARD_SIZE).map((item, index) => {

            let coordinate = Board.getCoordinate(index);
            return {
                x: coordinate.x,
                y: coordinate.y,
                side: Side.EMPTY
            }
        })
    }
}

export function getInitialGameState(): GameState {
    return initialGameState;
}