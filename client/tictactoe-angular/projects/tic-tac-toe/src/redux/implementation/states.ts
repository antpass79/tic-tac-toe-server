export enum CellSign {
    
    none = 0,
    x = 1,
    o = 2
}

export interface CellState {

    readonly x: number;
    readonly y: number;
    readonly sign: CellSign;
    readonly step: number;
}

export interface GridState {

    readonly isEnded: boolean;
    readonly cells: Array<CellState>;
}

export interface GameState {

    readonly started: boolean;
    readonly startPlayer: boolean;
    readonly isHumanPlayerRound: boolean;
    readonly robotIsThinking: boolean;
    readonly winner: CellSign;
    readonly gridState: GridState;
}

export const initialState: GameState = {

    started: false,
    startPlayer: true,
    isHumanPlayerRound: true,
    robotIsThinking: false,
    winner: CellSign.none,
    gridState: {

        isEnded: true,
        cells: initializeCells()
    }
}

export function initializeCells() {

    let cells: Array<CellState> = new Array<CellState>();

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            cells.push({
                x: x,
                y: y,
                sign: CellSign.none,
                step: -1
            });
        }
    }

    return cells;
}