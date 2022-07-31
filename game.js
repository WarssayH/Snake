import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection} from "./snake.js";
import {update as updateFood, draw as drawFood} from "./food.js";
import {outsideBoard} from "./board.js";
export {difficultySelect};

let lastRenderTime;
let gameOver = false;

const board = document.getElementById('board');
const difficultySelect = document.getElementsByClassName('difficulty');
const easy = document.getElementById('easy');
const normal = document.getElementById('normal');
const hard = document.getElementById('hard');

easy.addEventListener('click', setDifficulty);
normal.addEventListener('click', setDifficulty);
hard.addEventListener('click', setDifficulty);

var difficulty;

window.requestAnimationFrame(game);

function game(currentTime) {
    if (gameOver) {
        window.location = '/Snake';
        return;
    }
    window.requestAnimationFrame(game);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    const SNAKE_SPEED = setSpeed();
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;
    update();
    draw();
}

function setDifficulty(event) {
    difficultySelect[0].classList.remove('active');
    difficulty = event.target.id;
}

function setSpeed() {
    let snakeSpeed;
    switch (difficulty) {
        case 'easy':
            snakeSpeed = 10;
            break;
        case 'normal':
            snakeSpeed = 15;
            break;
        case 'hard':
            snakeSpeed = 20;
            break;
    } return snakeSpeed;
}

function update() {
    updateSnake();
    updateFood();
    checkFail();
}

function draw() {
    board.innerHTML = "";
    drawSnake(board);
    drawFood(board);
}

function checkFail() {
    gameOver = outsideBoard(getSnakeHead()) || snakeIntersection();
}