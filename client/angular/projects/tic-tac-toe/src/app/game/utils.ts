export class BoardUtils {

    static BOARD_DIM = 3;
    static BOARD_SIZE = BoardUtils.BOARD_DIM * BoardUtils.BOARD_DIM;

    static getIndex(x: number, y: number) {
        return x * 3 + y;
    }

    static getCoordinate(index: number): { x: number, y: number } {

        let coordinate = {
            x: Math.floor(index / BoardUtils.BOARD_DIM),
            y: index % BoardUtils.BOARD_DIM
        }

        return coordinate;
    }
}