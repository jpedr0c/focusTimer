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
    counter.forEach((span) => {
        span.style.color = counterColor;
    });
    cardSounds.forEach((card) => {
        card.style.backgroundColor = cardBackgroundColor;
    });
}

btnMode.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    toggleMode();
});

cardSounds.forEach(card => {
    const audio = new Audio();
    audio.src = `./sounds/${card.id}.wav`;
    audio.loop = true;
    audioElements.push(audio);
    card.addEventListener('click', () => {
        const isSelected = card.classList.contains('activated');
        cardSounds.forEach(card => {
            card.classList.remove('activated');
        });

        audioElements.forEach(audio => {
            audio.pause();
        });

        if (!isSelected) {
            card.classList.add('activated');
            audio.play();
        }
    });
});

function togglePlayPauseButtons() {
    btnPause.classList.toggle('hidden');
    btnPlay.classList.toggle('hidden');
}

btnPlay.addEventListener('click', () => {
    togglePlayPauseButtons();
});

btnPause.addEventListener('click', () => {
    togglePlayPauseButtons();
});

btnStop.addEventListener('click', () => {
    btnPause.classList.add('hidden');
    btnPlay.classList.remove('hidden');
});

btnPlus.addEventListener('click', () => {
    if (minutes <= 90) {
        if (minutes < 5)
            minutes += 1;
        else
            minutes += 5;
        minutesElement.textContent = minutes.toString().padStart(2, '0');
    }
});

btnMinus.addEventListener('click', () => {
    if (minutes > 1) {
        if (minutes <= 5)
            minutes -= 1;
        else
            minutes -= 5;
        minutesElement.textContent = minutes.toString().padStart(2, '0');
    }
});