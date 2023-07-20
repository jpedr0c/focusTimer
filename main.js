const btnMode = document.getElementById('mode');
const counter = document.querySelectorAll('span');
const cardSounds = document.querySelectorAll('.card');
const btnPlay = document.getElementById('play');
const btnPause = document.getElementById('pause');
const btnStop = document.getElementById('stop');
const btnPlus = document.getElementById('plus');
const btnMinus = document.getElementById('minus');
let minutesElement = document.getElementById('minutes');
let minutes = Number(minutesElement.textContent);
let secondsElement = document.getElementById('seconds');
let seconds = Number(secondsElement.textContent);
const audioElements = [];
let isDarkMode = false;
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
        seconds = 5;
      } else
        stopAndResetTimer();
    }
    updateTimerDisplay();
  }, 1000);
}

function stopAndResetTimer() {
  clearInterval(countdownInterval);
  seconds = 0;
  // TODO: Fazer a atualização do tempo de acordo com o que o usuário vai aumentando antes de dar play no contador
  //       para que quando ele der stop volte para valor setado por ele anteriormente e não para um valor padrão
  minutes = 10;
  updateTimerDisplay();
  btnPause.classList.add('hidden');
  btnPlay.classList.remove('hidden');
}

function incrementMinutes(){
  if (minutes <= 98) {
    if (minutes < 5 || minutes >= 95)
      minutes += 1;
    else
      minutes += 5;
  }
  updateTimerDisplay();
}

function decreaseMinutes(){
  if (minutes > 1) {
    if (minutes <= 5 || minutes >= 96)
      minutes -= 1;
    else
      minutes -= 5;
  }
  updateTimerDisplay();
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
}

btnPlay.addEventListener('click', () => {
  togglePlayPauseButtons();
  startCountdown();
});

btnPause.addEventListener('click', () => {
  clearInterval(countdownInterval);
  togglePlayPauseButtons();
});

btnMode.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  toggleMode();
});

btnStop.addEventListener('click', stopAndResetTimer);

btnPlus.addEventListener('click', incrementMinutes);

btnMinus.addEventListener('click', decreaseMinutes);