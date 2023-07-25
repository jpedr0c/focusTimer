export const buttonPressAudio = new Audio('../../assets/sounds/buttonPress.wav');
export const kitchenTimer = new Audio('../../assets/sounds/kitchenTimer.mp3');
export const forestAudio = new Audio('../../assets/sounds/forest.wav');
export const rainAudio = new Audio('../../assets/sounds/rain.wav');
export const coffeeShopAudio = new Audio('../../assets/sounds/coffeeShop.wav');
export const fireplaceAudio = new Audio('../../assets/sounds/fireplace.wav');

forestAudio.loop = true;
rainAudio.loop = true;
coffeeShopAudio.loop = true;
fireplaceAudio.loop = true;

export function stopAllSounds() {
  forestAudio.pause();
  rainAudio.pause();
  coffeeShopAudio.pause();
  fireplaceAudio.pause();
}