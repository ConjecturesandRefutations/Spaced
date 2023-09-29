//opening music
const opening = new Audio('./audio/opening.mp3');

//sounf effects
const explosion = new Audio('./audio/asteroid.mp3');
const laser = new Audio('./audio/laser.mp3');

//gameplay music
const hearts = new Audio('./audio/hearts.mp3');
const radiohead = new Audio('./audio/radiohead.mp3');
const xtal = new Audio('./audio/xtal.mp3');
const helisophan = new Audio('./audio/heliosphan.mp3');
const binary = new Audio('./audio/binary.mp3');
const clipper = new Audio('./audio/clipper.mp3');
const stone = new Audio('./audio/stone.mp3');
const alpha= new Audio('./audio/alpha.mp3');
const vastrond= new Audio('./audio/vastrond.mp3');
const loved= new Audio('./audio/loved.mp3');
const blanked = new Audio('./audio/blanked.mp3');
const brazil = new Audio('./audio/brazil.mp3');
const telepath = new Audio('./audio/telepath.mp3');
const telephasic = new Audio('./audio/telephasic.mp3');
const pangaea = new Audio('./audio/pangaea.mp3');
const minus = new Audio('./audio/minus.mp3');
const kid = new Audio('./audio/kid.mp3');
const tenebris = new Audio('./audio/tenebris.mp3');
const camel = new Audio('./audio/camel.mp3');
const zodiac = new Audio('./audio/zodiac.mp3');
const blimey = new Audio('./audio/blimey.mp3');
const untravel = new Audio('./audio/untravel.mp3');
const math = new Audio('./audio/math.mp3');

let songs = [hearts,radiohead,xtal,helisophan,
binary,clipper,stone,alpha,vastrond,loved,
blanked,brazil,telepath,telephasic,pangaea,minus,
kid,tenebris,camel,zodiac,blimey,untravel,math];

let nextSong;//

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
      nextSong.removeEventListener('ended', playNextRandomSong, { once: true });
      gameMusicPaused = false;
      muteButton.innerHTML = '<img id="mute" src="./images/mute.png"/>';
  }

  nextSong = songs[currentSongIndex]; // Assign the next song to nextSong variable
  nextSong.currentTime = 0;

  // Event listener for the song to play the next random song once it ends.
  nextSong.addEventListener('ended', () => {
      nextSong.removeEventListener('ended', playNextRandomSong, { once: true });
      playNextRandomSong(); // Play the next random song when this one ends
  }, { once: true });

  // Play the next song
  nextSong.play();
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
//Audio Controls
const audioControls = document.querySelector('.utility-buttons');
audioControls.style.display = 'none';

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

  //Mute Button
const muteButton = document.getElementById('mute-button');

// Mute event listener to the opening audio element
muteButton.addEventListener('click', () => {
    pauseGameMusic();
  });

  //Next Button

const nextButton = document.getElementById('next-button');

nextButton.addEventListener('click', playNextRandomSong);

function preventSpacebarClick(buttonElement) {
  buttonElement.addEventListener("click", function (e) {
  });

  // Prevent the spacebar from triggering a click event on the button
  buttonElement.addEventListener("keydown", function (e) {
    if (e.key === " ") {
      e.preventDefault();
    }
  });
}

// Apply the behavior to both buttons
preventSpacebarClick(muteButton);
preventSpacebarClick(nextButton);
