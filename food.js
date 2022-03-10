import {onSnake, expandSnake} from "./snake.js";
import {BOARD_SIZE} from "./board.js";

let food = {x:5, y:5}
const EXPANSION_RATE = 1;

export function update() {
    if (!onSnake(food)) return;
    expandSnake(EXPANSION_RATE);
    food = newFood();
}

export function draw() {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

function newFood() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition))
        newFoodPosition = {x: Math.floor(Math.random() * BOARD_SIZE) + 1, y: Math.floor(Math.random() * BOARD_SIZE) + 1};
    return newFoodPosition;
}