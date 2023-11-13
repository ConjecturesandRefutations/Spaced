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

// Settings Button
const settingsButton = document.querySelector('.settings');
  settingsButton.onclick = () => {
  resetScore();
  setupSection.style.display = '';
  GameOver.style.display = 'none';
  audioControls.style.display = 'none';
  score.style.display = 'none';
}