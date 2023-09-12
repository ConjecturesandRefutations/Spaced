//Key Variables

let background = new Image();
let backgroundY = 0;
background.src = "./images/game.jpg";


//Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.display = 'none';



//Opening Section
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
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // draw background image
  // Instantiate a new ship
  currentShip = new Ship();
  currentShip.drawShip();
  updateCanvas();

}


function updateCanvas() {
  ctx.clearRect(0, 0, canvas.height, canvas.width); // clear canvas
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // redraw the background

 currentShip.drawShip(); // redraw the ship at its current position

 requestAnimationFrame(updateCanvas);
}