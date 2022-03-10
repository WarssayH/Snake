export const BOARD_SIZE = 21;

export function outsideBoard(position) {
    return position.x < 1 || position.x > BOARD_SIZE || position.y < 1 || position.y > BOARD_SIZE;
}