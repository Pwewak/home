var blockSize = 30;
var rows = 20;
var cols = 30;
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var vx = 0;
var vy = 0;

var snakeBody = [];

var foodX;
var foodY;

var gameover = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");
  placefood();
  document.addEventListener("keyup", changeDirection);
  // update();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameover) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "Red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placefood();
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  context.fillStyle = "lime";
  snakeX += vx * blockSize;
  snakeY += vy * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameover = true;
    alert("Game Over");
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameover = true;
      alert("Game Over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "KeyW" && vy != 1) {
    vx = 0;
    vy = -1;
  }
  if (e.code == "KeyS" && vy != -1) {
    vx = 0;
    vy = 1;
  }
  if (e.code == "KeyA" && vx != 1) {
    vx = -1;
    vy = 0;
  }
  if (e.code == "KeyD" && vx != -1) {
    vx = 1;
    vy = 0;
  }
}

function placefood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
