const btnMode = document.getElementById('mode');
const counter = document.querySelectorAll('span');
const cardSounds = document.querySelectorAll('.card');
const btnForest = document.getElementById('forest');
const btnRain = document.getElementById('rain');
const btnCoffeeShop = document.getElementById('coffeeShop');
const btnFireplace   = document.getElementById('fireplace');
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

    if (isDarkMode) {
        document.body.style.backgroundColor = 'black';
        counter.forEach((span) => {
            span.style.color = '#FFFFFF';
        });
        cardSounds.forEach((card) => {
            card.style.backgroundColor = '#29292E';
        });
    } else {
        document.body.style.backgroundColor = 'white';
        counter.forEach((span) => {
            span.style.color = '#323238';
        });
        cardSounds.forEach((card) => {
            card.style.backgroundColor = '#E1E1E6';
        });
    }
}

btnMode.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    toggleMode();
});

btnForest.addEventListener('click', () => {
    console.log("Funcionando botão forest");
    btnForest.classList.toggle('activated');
})