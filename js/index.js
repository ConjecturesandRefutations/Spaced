// Key Variables
let background = new Image();
let backgroundX = 0;
let homepaged = false;
let currentShip;
let obstaclesFrequency = 0; // support the logic for generating obstacles

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
const arrows = document.querySelector('.circle-container')
arrows.style.display = 'none'

// Homepage Button
const homeButton = document.querySelector('.homepage');
  homeButton.onclick = () => {
  nextSong.pause();
  openingAudioPlaying = false;
  arrows.style.display = 'none'
  muteButton.innerHTML = '<img id="mute" src="./images/mute.png"/>';
  volumeIcon.classList.remove('fa', 'fa-volume-up');
  volumeIcon.classList.add('fa', 'fa-volume-mute');
  openingSection.style.display = '';
  setupSection.style.display = 'none';
  canvas.style.display = 'none';
  audioControls.style.display = 'none';
  currentShip.x = canvas.width / 2;
  currentShip.y = canvas.height / 1.25;
  backgroundX = 0;
  cancelAnimationFrame(animationID); // Stop the animation loop
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
    startGame();
  };
};

function startGame() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  currentGame = new Game();
  currentGame.rockets = [];

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
    } else {
      // Remove dead rockets from the array
      currentGame.rockets.splice(i, 1);
    }
  }

  if (obstaclesFrequency % 60 === 1) {
    // Determine which side to spawn the obstacle
    const side = Math.floor(Math.random() * 4); // 0 for top, 1 for right, 2 for bottom, 3 for left
  
    let randomObstacleX, randomObstacleY;
    let randomObstacleWidth = 50;
    let randomObstacleHeight = 70;
  
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
    obstacle.drawObstacle();
  
    // Move obstacles based on the direction they entered
    switch (obstacle.direction) {
      case 0: // Top
        obstacle.y += 3;
        break;
      case 1: // Right
        obstacle.x -= 3;
        break;
      case 2: // Bottom
        obstacle.y -= 3;
        break;
      case 3: // Left
        obstacle.x += 3;
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
  
  
  console.log(currentGame.obstacles.length)

  // Continue the animation loop
  animationID = requestAnimationFrame(updateCanvas);
}
