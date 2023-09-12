// Key Variables
let background = new Image();
let backgroundX = 0;
background.src = "./images/game.jpg";

// Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.display = 'none';

// Opening Section
const openingSection = document.querySelector('.opening-section');

// Start Button
const startButton = document.getElementById('start-button');
startButton.onclick = () => {
  opening.pause();
  openingSection.style.display = 'none';
  canvas.style.display = '';
  audioControls.style.display = '';
  playNextRandomSong();
  startGame();
};

function startGame() {
  currentGame = new Game();

  // Instantiate a new ship
  currentShip = new Ship();
  currentShip.drawShip();
  updateCanvas();
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  // Draw background image
  ctx.drawImage(background, backgroundX, 0, canvas.width, canvas.height);

  // Scroll the background to the left
  backgroundX -= 1; // Adjust the scroll speed as needed

  // Reset the background position if it goes beyond the canvas width
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }

  // Draw the second copy of the background image to create the continuous scroll
  ctx.drawImage(background, backgroundX + canvas.width, 0, canvas.width, canvas.height);

  currentShip.drawShip(); // redraw the ship at its current position

  requestAnimationFrame(updateCanvas);
}
