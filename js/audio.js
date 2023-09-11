//sound effects
let rocket = new Audio('./audio/rocket.mp3');

//opening music
let opening = new Audio('./audio/opening.mp3');

//gameplay music
let closing = new Audio('./audio/closing.mp3');
let hope = new Audio('./audio/hope.mp3');
let journey = new Audio('./audio/journey.mp3');
let lawn = new Audio('./audio/lawn.mp3');
let hannah = new Audio('./audio/hannah.mp3');
let vivid = new Audio('./audio/vivid.mp3');
let odyssey = new Audio('./audio/odyssey.mp3');
let closer = new Audio('./audio/closer.mp3');
let spacedOut = new Audio('./audio/spaced-out.mp3');
let space = new Audio('./audio/space.mp3');
let march = new Audio('./audio/march.mp3');
let mochas = new Audio('./audio/mochas.mp3');
let color = new Audio('./audio/color.mp3');

let songs = [closing, hope, journey, lawn, hannah, vivid, odyssey, closer, spacedOut, space, march, mochas, color];

let nextSong;

let gameMusicPaused = false;

let currentSongIndex = -1; // Initialize to -1 to start with the first song.

function playNextRandomSong() {
    if (currentSongIndex === -1 || currentSongIndex === songs.length - 1) {
        // If it's the first time or reached the end, shuffle the songs.
        songs.sort(() => Math.random() - 0.5);
        currentSongIndex = 0;
    } else {
        currentSongIndex++;
    }

    if (nextSong) {
        nextSong.pause(); // Pause the currently playing song
    }

    nextSong = songs[currentSongIndex]; // Assign the next song to nextSong variable
    nextSong.play();

    // Event listener for the song to play the next random song once it ends.
    nextSong.addEventListener('ended', playNextRandomSong, { once: true });
}

  

let openingAudioPlaying = false;

// Function to start playing the opening audio
function playOpeningAudio() {
  opening.play()
    .then(() => {
      openingAudioPlaying = true;
    })
    .catch((error) => {
      console.error('Error playing opening audio:', error);
      openingAudioPlaying = false;
    });
}

// Function to pause the opening audio
function pauseOpeningAudio() {
  opening.pause();
  openingAudioPlaying = false;
  volumeIcon.classList.remove('fa', 'fa-volume-up');
  volumeIcon.classList.add('fa', 'fa-volume-mute');
}

const openingAudio = document.querySelector('.play-music');
const volumeIcon = document.getElementById('volume-icon');

// Click event listener to the opening audio element
openingAudio.addEventListener('click', () => {
  if (openingAudioPlaying) {
    pauseOpeningAudio();
    volumeIcon.classList.remove('fa', 'fa-volume-up');
    volumeIcon.classList.add('fa', 'fa-volume-mute');
  } else {
    playOpeningAudio();
    volumeIcon.classList.remove('fa', 'fa-volume-mute');
    volumeIcon.classList.add('fa', 'fa-volume-up');
  }
});

// Event listener for the "ended" event of the opening audio
opening.addEventListener('ended', () => {
  openingAudioPlaying = false;
  volumeIcon.classList.remove('fa', 'fa-volume-up');
  volumeIcon.classList.add('fa', 'fa-volume-mute');
});


//Pause in-game music
let gameMusicPlaying = true;

function pauseGameMusic() {
    if (gameMusicPaused) {
      nextSong.play(); // Resume the in-game music
      gameMusicPaused = false;
      muteButton.innerText = 'mute';
    } else {
      nextSong.pause(); // Pause the in-game music
      gameMusicPaused = true;
      muteButton.innerText = 'play music'; 
    }
  }
  

//Audio Controls
const audioControls = document.querySelector('.audio-controls');
audioControls.style.display = 'none';

//Mute Button
const muteButton = document.getElementById('mute-button');

// Mute event listener to the opening audio element
muteButton.addEventListener('click', () => {
    pauseGameMusic();
  });

  //Next Button

const nextButton = document.getElementById('next-button');

nextButton.addEventListener('click', playNextRandomSong);

  
