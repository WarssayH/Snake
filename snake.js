import {getInput} from "./input.js"
import {BOARD_SIZE} from "./board.js";
import {difficultySelect} from "./game.js";
const snakeBody = [{x: Math.ceil(BOARD_SIZE / 2), y: Math.ceil(BOARD_SIZE / 2)}]
let newSegments = 0;

export function update() {
    if (difficultySelect[0].classList.contains('active')) return;
    addSegments();
    const input = getInput();
    for (let segment = snakeBody.length - 2; segment >= 0; segment--)
        snakeBody[segment + 1] = {...snakeBody[segment]};
    snakeBody[0].x += input.x;
    snakeBody[0].y += input.y;
}

export function draw(board) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        board.appendChild(snakeElement);
    });
}

export function expandSnake(expansion) {
    newSegments += expansion;
}

export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return segment.x === position.x && segment.y === position.y;
    })
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true});
}

export function getSnakeHead() {
    return snakeBody[0];
}

function addSegments() {
    for (let i = 0; i < newSegments; i++)
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    newSegments = 0;
}