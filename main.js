const btnMode = document.getElementById('mode');
const counter = document.querySelectorAll('span');
const cardSounds = document.querySelectorAll('.card');
const btnPlay = document.getElementById('play');
const btnPause = document.getElementById('pause');
const btnStop = document.getElementById('stop');
const btnSetTime = document.getElementById('setTime');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
let minutes = Number(minutesElement.textContent);
let seconds = Number(secondsElement.textContent);
const audioElements = [];
let setUserMinutes = minutes;
let isDarkMode = false;
let isCountdownActive = false;
let countdownInterval;

function toggleMode() {
  const imageFolder = isDarkMode ? 'darkMode' : 'lightMode';
  const imageElements = document.querySelectorAll('img');
  
  imageElements.forEach((img) => {
      const imgName = img.src.split('/').slice(-1);
      if (imgName == "sun.svg") {
          img.src = `./assets/darkMode/moon.svg`;
          return;
      }
      if (imgName == "moon.svg") {
          img.src = `./assets/lightMode/sun.svg`;
          return;
      }
      img.src = `./assets/${imageFolder}/${imgName}`;
  });

  const bodyBackgroundColor = isDarkMode ? 'black' : 'white';
  const counterColor = isDarkMode ? '#FFFFFF' : '#323238';
  const cardBackgroundColor = isDarkMode ? '#29292E' : '#E1E1E6';

  document.body.style.backgroundColor = bodyBackgroundColor;
  counter.forEach((span) => span.style.color = counterColor);
  cardSounds.forEach((card) => card.style.backgroundColor = cardBackgroundColor);
}

function startCountdown() {
  btnPlay.classList.add('hidden');
  btnPause.classList.remove('hidden');

  countdownInterval = setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else {
      if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else
        stopAndResetTimer();
    }
    updateTimerDisplay();
  }, 1000);
}

function stopAndResetTimer() {
  clearInterval(countdownInterval);
  isCountdownActive = false;
  seconds = 0;
  minutes = setUserMinutes;
  updateTimerDisplay();
  btnPause.classList.add('hidden');
  btnPlay.classList.remove('hidden');
  btnStop.classList.add('hidden');
  btnSetTime.classList.remove('hidden');
}

function updateTimerDisplay() {
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
}

function createAudioElement(card) {
  const audio = new Audio();
  audio.src = `./sounds/${card.id}.wav`;
  audio.loop = true;
  audioElements.push(audio);

  card.addEventListener('click', () => toggleCardSelected(card, audio));
}

function toggleCardSelected(card, audio) {
  const isSelected = card.classList.contains('activated');
  cardSounds.forEach(card => card.classList.remove('activated'));

  audioElements.forEach(audio => audio.pause());

  if (!isSelected) {
    card.classList.add('activated');
    audio.play();
  }
}

cardSounds.forEach(card => createAudioElement(card));

function togglePlayPauseButtons() {
  btnPause.classList.toggle('hidden');
  btnPlay.classList.toggle('hidden');
  btnStop.classList.remove('hidden');
  btnSetTime.classList.add('hidden');
}

btnMode.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  toggleMode();
});

btnPlay.addEventListener('click', () => {
  isCountdownActive = true;
  togglePlayPauseButtons();
  startCountdown();
});

btnPause.addEventListener('click', () => {
  clearInterval(countdownInterval);
  togglePlayPauseButtons();
});

btnSetTime.addEventListener('click', () => {
  // TODO: Fazer a funcionalidade do setTime
  console.log("Botão setTime funcionando");
});

btnStop.addEventListener('click', stopAndResetTimer);