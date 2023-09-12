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

  // Draw background image
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height); 
   // Scroll the background downwards
   backgroundY += 5;
   if (backgroundY >= myCanvas.height) {
       backgroundY = 0;
   }

   // Draw the background image twice, one above the other, to cover the entire canvas
   ctx.drawImage(background, 0, backgroundY, myCanvas.width, myCanvas.height);
   ctx.drawImage(background, 0, backgroundY - myCanvas.height, myCanvas.width, myCanvas.height);
   
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