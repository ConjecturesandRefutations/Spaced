// Key Variables
let background = new Image();
let backgroundX = 0;
let homepaged = false;
let currentShip;

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
  currentGame = new Game();

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

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Continue the animation loop
  animationID = requestAnimationFrame(updateCanvas);
}
