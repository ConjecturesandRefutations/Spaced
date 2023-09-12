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
window.onload = () => {
const startButton = document.getElementById('start-button');
startButton.onclick = () => {
  opening.pause();
  openingSection.style.display = 'none';
  canvas.style.display = '';
  audioControls.style.display = '';
  playNextRandomSong();
  startGame();
}
};

function startGame() {
  currentGame = new Game();

    // Instantiate a new ship
    currentShip = new Ship();
    currentShip.drawShip();

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // draw background image

  requestAnimationFrame(updateCanvas);
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

  requestAnimationFrame(updateCanvas);
}
