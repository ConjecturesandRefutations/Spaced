//Canvas
const canvas = document.getElementById('canvas');
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
};
