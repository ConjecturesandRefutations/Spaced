// Key Variables
let background = new Image();
let backgroundX = 0;
let homepaged = false;
let currentShip;
let obstaclesFrequency = 0; // support the logic for generating obstacles
let obstacleSpeed = 3;
let divisor = 60;
let lastDivisorDecreaseTime = 0;
let lastSpeedIncreaseTime = 0;
let startTime = 0;
let gameOver = false;

// Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.display = 'none';

// Opening Section
const openingSection = document.querySelector('.opening-section');

// Setup Section
const setupSection = document.querySelector('.setup-section');
setupSection.style.display = 'none';

//Mobile Arrows
const arrows = document.querySelector('.circle-container');
arrows.style.display = 'none'

//Score Section
const score = document.querySelector('.score');
score.style.display = 'none';
const scoreValue = document.getElementById('score-value');

//Instructions Section
const instructionSection = document.querySelector('.instruction-section');
instructionSection.style.display = 'none';
//Instruction Button
const instructionButton = document.querySelector('.instruction');
  instructionButton.onclick = () => {
    openingSection.style.display = 'none';
    audioControls.style.display = 'none';
    instructionSection.style.display = '';
}

//Game Over Section
const GameOver = document.querySelector('.end-game');
GameOver.style.display = 'none';

// Homepage Button
const homeButton = document.querySelector('.homepage');
  homeButton.onclick = () => {
  nextSong.pause();
  openingAudioPlaying = false;
  GameOver.style.display = 'none';
  arrows.style.display = 'none';
  score.style.display = 'none';
  muteButton.innerHTML = '<img id="mute" src="./images/mute.png"/>';
  volumeIcon.classList.remove('fa', 'fa-volume-up');
  volumeIcon.classList.add('fa', 'fa-volume-mute');
  openingSection.style.display = '';
  setupSection.style.display = 'none';
  canvas.style.display = 'none';
  audioControls.style.display = 'none';
  instructionSection.style.display = 'none';
  resetScore();
 
  cancelAnimationFrame(animationID); // Stop the animation loop
}

// Homepage Button
const backButton = document.querySelector('.back');
  backButton.onclick = () => {
  openingSection.style.display = '';
  instructionSection.style.display = 'none';
}

//Original Button
const startButtonOne = document.getElementById('start-button');
startButtonOne.onclick = () => {
  opening.pause();
  playNextRandomSong();
  opening.currentTime = 0;
  openingSection.style.display = 'none';
  setupSection.style.display = '';
};

// Start Button
let animationID; // Store the animation ID
window.onload = () => {
  const startButton = document.getElementById('start-button-two');
  startButton.onclick = () => {
    openingSection.style.display = 'none';
    setupSection.style.display = 'none';
    canvas.style.display = '';
    arrows.style.display = '';
    audioControls.style.display = '';
    score.style.display = '';
    startGame();
  };
};

// Restart Button
const restartButton = document.getElementById('restart');
  restartButton.onclick = () => {
  gameOver = false;
  resetScore();
  GameOver.style.display = 'none';
  canvas.style.display = '';
  startGame();
}

function startGame() {
  gameOver = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  startTime = Date.now();
  currentGame = new Game();
  currentGame.rockets = [];
  arrows.style.display='';

  // Instantiate a new ship
  currentShip = new Ship();
  currentShip.drawShip();

  addTouchListeners();

  // Clear any previous animation loop
  cancelAnimationFrame(animationID);

  // Start the animation loop
  animationID = requestAnimationFrame(updateCanvas);
}

function updateCanvas() {
  if (gameOver) {
    // Game over, do not continue the animation loop
    return;
  }
  const currentTime = Date.now();
  const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds

  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  // Scroll the background to the left
  backgroundX -= 0.3;
  // Reset the background position if it goes beyond the canvas width
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }

  // Draw background image
  ctx.drawImage(background, backgroundX, 0, canvas.width, canvas.height);
  // Draw the second copy of the background image to create the continuous scroll
  ctx.drawImage(background, backgroundX + canvas.width, 0, canvas.width, canvas.height);

  currentShip.drawShip(); // redraw the ship at its current position
  obstaclesFrequency++;

 // Update and draw rockets
for (let i = currentGame.rockets.length - 1; i >= 0; i--) {
  const rocket = currentGame.rockets[i];

  if (rocket.isAlive) {
    rocket.update();
    rocket.draw();

    // Check for collisions with obstacles
    for (let j = currentGame.obstacles.length - 1; j >= 0; j--) {
      const obstacle = currentGame.obstacles[j];

      if (obstacle.collidesWith(rocket.x, rocket.y)) {
        if (!obstacle.wasHit) { // Check if the obstacle was not hit before
          obstacle.destroy();
          if(gameMusicPaused){
          explosion.play();
          }
          currentGame.score++;
          scoreValue.innerText = currentGame.score;
          obstacle.wasHit = true; // Mark the obstacle as hit
        }

        // Remove the rocket from the array
        currentGame.rockets.splice(i, 1);
      }
    }
  } else {
    // Remove dead rockets from the array
    currentGame.rockets.splice(i, 1);
  }
}

  
  if (obstaclesFrequency % divisor === 1) {
    // Determine which side to spawn the obstacle
    const side = Math.floor(Math.random() * 4); // 0 for top, 1 for right, 2 for bottom, 3 for left
  
    let randomObstacleX, randomObstacleY;
    let randomObstacleWidth = Math.floor(Math.random() * (150 - 30 + 1)) + 30;
    let randomObstacleHeight = Math.floor(Math.random() * (150 - 30 + 1)) + 30;
  
    // Set initial position based on the chosen side
    switch (side) {
      case 0: // Top
        randomObstacleX = Math.floor(Math.random() * canvas.width);
        randomObstacleY = -randomObstacleHeight;
        break;
      case 1: // Right
        randomObstacleX = canvas.width;
        randomObstacleY = Math.floor(Math.random() * canvas.height);
        break;
      case 2: // Bottom
        randomObstacleX = Math.floor(Math.random() * canvas.width);
        randomObstacleY = canvas.height;
        break;
      case 3: // Left
        randomObstacleX = -randomObstacleWidth;
        randomObstacleY = Math.floor(Math.random() * canvas.height);
        break;
    }
  
    let newObstacle = new Obstacle(
      randomObstacleX,
      randomObstacleY,
      randomObstacleWidth,
      randomObstacleHeight
    );
    
    // Set the direction for the obstacle
    newObstacle.direction = side;
  
    currentGame.obstacles.push(newObstacle);
  }
  
  for (let i = 0; i < currentGame.obstacles.length; i++) {
    const obstacle = currentGame.obstacles[i];
  
    if (obstacle.wasHit && obstacle.currentExplosionFrame >= obstacle.explosionFrames) {
      // Remove obstacles after the explosion animation is finished
      currentGame.obstacles.splice(i, 1);
    } else {
      obstacle.drawObstacle();
    }
  
  
    // Move obstacles based on the direction they entered
    switch (obstacle.direction) {
      case 0: // Top
        obstacle.y += obstacleSpeed;
        break;
      case 1: // Right
        obstacle.x -= obstacleSpeed;
        break;
      case 2: // Bottom
        obstacle.y -= obstacleSpeed;
        break;
      case 3: // Left
        obstacle.x += obstacleSpeed;
        break;
    }
  
    // Logic for removing obstacles
    if (
      currentGame.obstacles.length > 0 &&
      (obstacle.x >= canvas.width ||
        obstacle.x + obstacle.width <= 0 ||
        obstacle.y >= canvas.height ||
        obstacle.y + obstacle.height <= 0)
    ) {
      currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
    }
  }
  
  if (elapsedTimeInSeconds >= 20 && currentTime - lastDivisorDecreaseTime >= 20000) {
    //making the game progressively harder
    obstacleSpeed += 0.2;
    if (divisor > 3) {
      divisor -= 3;
    }
    lastDivisorDecreaseTime = currentTime; // Update the last decrease time
    lastSpeedIncreaseTime = currentTime; // Update the last decrease time
  }

/*   for(let i = 0; i<currentGame.obstacles.length; i++) {
    if (detectCollision(currentGame.obstacles[i])) {
     endGame()
   }       
 } */

function endGame(){
  gameOver = true;
  explosion.play();
  currentShip.x = canvas.width/2;
  currentShip.y = canvas.height/1.25;
  GameOver.style.display = '';
  arrows.style.display = 'none';
  canvas.style.display = 'none';
 }

  // Continue the animation loop
  animationID = requestAnimationFrame(updateCanvas);
}

function detectCollision(obstacle) {
  const overlap = 5; // Adjust this value as needed for the desired overlap

  return (
    currentShip.x + currentShip.width - overlap > obstacle.x &&
    currentShip.x + overlap < obstacle.x + obstacle.width &&
    currentShip.y + currentShip.height - overlap > obstacle.y &&
    currentShip.y + overlap < obstacle.y + obstacle.height
  );
}



function resetScore(){
  currentGame.score = 0;
  divisor = 60;
  obstacleSpeed = 3;
  currentShip.x = canvas.width / 2;
  currentShip.y = canvas.height / 2;
  scoreValue.innerText = currentGame.score;
 }

