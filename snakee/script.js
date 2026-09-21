const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;

let snake;
let food;
let direction;
let score;
let game;

function startGame() {

    snake = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];

    direction = "RIGHT";
    score = 0;

    document.getElementById("score").textContent = score;

    createFood();

    clearInterval(game);
    game = setInterval(drawGame, 100);
}

// Create food
function createFood() {

    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

// Keyboard controls
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp") {
        changeDirection("UP");
    }

    if (event.key === "ArrowDown") {
        changeDirection("DOWN");
    }

    if (event.key === "ArrowLeft") {
        changeDirection("LEFT");
    }

    if (event.key === "ArrowRight") {
        changeDirection("RIGHT");
    }
});

// Button controls
function changeDirection(newDirection) {

    if (newDirection === "UP" && direction !== "DOWN") {
        direction = "UP";
    }

    if (newDirection === "DOWN" && direction !== "UP") {
        direction = "DOWN";
    }

    if (newDirection === "LEFT" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (newDirection === "RIGHT" && direction !== "LEFT") {
        direction = "RIGHT";
    }
}

// Draw game
function drawGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = i === 0 ? "lime" : "green";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box,
            box
        );
    }

    // Draw food
    ctx.fillStyle = "red";

    ctx.fillRect(
        food.x,
        food.y,
        box,
        box
    );

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move snake
    if (direction === "UP") {
        snakeY -= box;
    }

    if (direction === "DOWN") {
        snakeY += box;
    }

    if (direction === "LEFT") {
        snakeX -= box;
    }

    if (direction === "RIGHT") {
        snakeX += box;
    }

    // Food collision
    if (snakeX === food.x && snakeY === food.y) {

        score++;

        document.getElementById("score").textContent = score;

        createFood();

    } else {

        snake.pop();
    }

    const newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {

        gameOver();

        return;
    }

    snake.unshift(newHead);
}

// Check snake collision
function collision(head, body) {

    for (let i = 0; i < body.length; i++) {

        if (
            head.x === body[i].x &&
            head.y === body[i].y
        ) {
            return true;
        }
    }

    return false;
}

// Game over
function gameOver() {

    clearInterval(game);

    alert("YOU LOSE😯 YOUR SCORE IS: " + score);
}

// Restart
function restartGame() {

    startGame();
}

// Start game
startGame();

