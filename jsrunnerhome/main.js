let canvas = document.getElementById("mainCanvas");
let ctx = canvas.getContext('2d')
let sprite = document.getElementById("sprite");

function Back(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let upperGradient = ctx.createLinearGradient(0, 0, 0, (2/3) * window.innerHeight);
upperGradient.addColorStop(0, "turquoise");
upperGradient.addColorStop(1, "hotpink");      

ctx.fillStyle = upperGradient;
ctx.fillRect(0, 0, window.innerWidth, (2/3) * window.innerHeight);

let lowerGradient = ctx.createLinearGradient(0, (2/3) * window.innerHeight, 0, window.innerHeight);
lowerGradient.addColorStop(0, "pink"); 
lowerGradient.addColorStop(1, "grey"); 


ctx.fillStyle = lowerGradient;
ctx.fillRect(0, (2/3) * window.innerHeight, window.innerWidth, window.innerHeight);


ctx.beginPath();
ctx.moveTo(0, (2/3) * window.innerHeight); 
ctx.lineTo(window.innerWidth, (2/3) * window.innerHeight); 
ctx.lineTo(window.innerWidth, window.innerHeight); 
ctx.lineTo(0, window.innerHeight); 
ctx.closePath();

ctx.fillStyle = lowerGradient; 
ctx.fill(); 

};


let yarn = new Image();
yarn.src = "sprites/yarn.png";
let yarnX = window.innerWidth;
let yarnY = window.innerHeight*(2/3)-(1/4)*yarn.height;

yarn.onload = function() {
    console.log("Image loaded");
    ctx.save();
    ctx.translate(yarnX, yarnY);
    ctx.scale(-0.5, 0.5);
    ctx.drawImage(yarn, 0, 0);
    ctx.restore();
};


let Player = new Image();
Player.src = "sprites/footbackward.png"; 
let PlayerX = 0;
let PlayerY = window.innerHeight*(2/3)-Player.height-200;
let flipPlayer = true; 

Player.onload = function() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); 
  Back(); 

  if (flipPlayer) {
    ctx.save();
    ctx.translate(PlayerX + Player.width, PlayerY);
    ctx.scale(-1, 1);
    ctx.drawImage(Player, 0, 0);
    ctx.restore();
  } else {
    ctx.drawImage(Player, PlayerX, PlayerY);
  }
};

let ydx = -5;
let ydy = 0;

let dx = 0;
let dy = 0;

addEventListener('keydown',function(e){
    // console.log(e.code);
    if(e.code=="KeyD") {
        dx = 5;  
        flipPlayer=true; 
    }
    if(e.code=="KeyA") {
        dx = -5;
        flipPlayer=false;
    }
    if(e.code=="KeyW") {
        if(landed){
        dy = 5;  
        landed = false;
        }
    }
});

addEventListener('keyup',function(e){
    // console.log(e.code);
    if(e.code=="KeyD") {
        dx = 0;  
    }
    if(e.code=="KeyA") {
        dx = 0;
    }
});


function update(){
    PlayerX += dx;
    PlayerY -= dy;
    yarnX +=ydx;
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    Back();
    Player.onload();
    yarn.onload()
    collision();
    requestAnimationFrame(update);
}

let landed = false;
let gameOver = false;

function collision(){
    const playerLeft = Math.floor(PlayerX);
    const playerRight = Math.floor(PlayerX + Player.width);
    const playerTop = Math.floor(PlayerY);
    const playerBottom = Math.floor(PlayerY + Player.height);
    const yarnLeft = Math.floor(yarnX);
    const yarnRight = Math.floor(yarnX + yarn.width);
    const yarnTop = Math.floor(yarnY);
    const yarnBottom = Math.floor(yarnY + yarn.height);


    if(PlayerY >= (1/2)*window.innerHeight){
        PlayerY +=dy;
        landed =true;
    }
    if (PlayerX < yarnRight && playerRight > yarnX && PlayerY < yarnBottom && playerBottom > yarnY) {
        
        console.log("Player collided with the yarn");
        yarnX = window.innerWidth;
        yarnY = window.innerHeight * (2/3) - (1/4) * yarn.height;
    }
    if (yarnX <= 0) {
        // Display the "Game Over" screen
        const gameOverScreen = document.getElementById("gameOverScreen");
        gameOverScreen.style.display = "block";
        console.log("Game Over");
        
    }
};

update();

setInterval(function Gravity(){
    if(landed==false){
    dy -= 0.05;
    }
});

let playerImages = ["sprites/footbackward.png", "sprites/footforward.png"];
let currentPlayerImageIndex = 0;

function switchPlayers() {
  currentPlayerImageIndex = (currentPlayerImageIndex + 1) % playerImages.length;
  Player.src = playerImages[currentPlayerImageIndex];
}


playerImages.forEach(imagePath => {
  const image = new Image();
  image.src = imagePath;
});


setInterval(switchPlayers, 150);