// Key Variables
let background = new Image();
let backgroundX = 0;
background.src = "./images/game.jpg";
let homepaged = false;

// Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.display = 'none';

// Opening Section
const openingSection = document.querySelector('.opening-section');

// Homepage Button
const homeButton = document.querySelector('.homepage');
homeButton.onclick = () => {
  nextSong.pause();
  muteButton.innerText = 'mute';
  openingSection.style.display = '';
  canvas.style.display = 'none';
  audioControls.style.display = 'none';
  currentShip.x = canvas.width / 2;
  currentShip.y = canvas.height / 1.25;
  backgroundX = 0;
  cancelAnimationFrame(animationID); // Stop the animation loop
}

// Start Button
let animationID; // Store the animation ID
window.onload = () => {
  const startButton = document.getElementById('start-button');
  startButton.onclick = () => {
    opening.pause();
    openingSection.style.display = 'none';
    canvas.style.display = '';
    audioControls.style.display = '';
    startGame();
    playNextRandomSong();
  };
};

function startGame() {
  currentGame = new Game();

  // Instantiate a new ship
  currentShip = new Ship();
  currentShip.drawShip();

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

  // Continue the animation loop
  animationID = requestAnimationFrame(updateCanvas);
}
