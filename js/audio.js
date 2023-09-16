//opening music
const opening = new Audio('./audio/opening.mp3');

//gameplay music
const closing = new Audio('./audio/closing.mp3');
const hope = new Audio('./audio/hope.mp3');
const journey = new Audio('./audio/journey.mp3');
const lawn = new Audio('./audio/lawn.mp3');
const hannah = new Audio('./audio/hannah.mp3');
const vivid = new Audio('./audio/vivid.mp3');
const closer = new Audio('./audio/closer.mp3');
const spacedOut = new Audio('./audio/spaced-out.mp3');
const space = new Audio('./audio/space.mp3');
const march = new Audio('./audio/march.mp3');
const mochas = new Audio('./audio/mochas.mp3');
const shadowed = new Audio('./audio/shadowed.mp3');
const water = new Audio('./audio/water.mp3');
const adrift = new Audio('./audio/adrift.mp3');
const callisto = new Audio('./audio/callisto.mp3');
const dragon = new Audio('./audio/dragon.mp3');
const emos = new Audio('./audio/emos.mp3');
const radiohead = new Audio('./audio/radiohead.mp3');
const xtal = new Audio('./audio/xtal.mp3');
const helisophan = new Audio('./audio/heliosphan.mp3');
const binary = new Audio('./audio/binary.mp3');
const clipper = new Audio('./audio/clipper.mp3');
const stone = new Audio('./audio/stone.mp3');

let songs = [closing, hope, journey, lawn, hannah, vivid, 
closer, spacedOut, space, march, mochas, shadowed, water,
adrift, callisto, dragon, emos, radiohead, xtal,
helisophan, binary, clipper, stone];

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
      muteButton.innerHTML = '<img id="mute" src="./images/mute.png"/>';
    } else {
      nextSong.pause(); // Pause the in-game music
      gameMusicPaused = true;
      muteButton.innerHTML = '<img id="play" src="./images/play.png"/>'; 
    }
  }
  

//Audio Controls
const audioControls = document.querySelector('.utility-buttons');
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

  
