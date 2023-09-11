//Canvas
const canvas = document.getElementById('canvas');
canvas.style.display = 'none';

//Opening Section
const openingSection = document.querySelector('.opening-section');

//Start Button
const startButton = document.getElementById('start-button');
window.onload = () => {
    startButton.onclick = () => {
    openingSection.style.display = 'none';
    canvas.style.display = '';
    };
  };