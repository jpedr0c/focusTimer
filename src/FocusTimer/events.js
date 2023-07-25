import state from "./state.js";
import { controls, cardsSounds } from "./elements.js";
import { updateTimerDisplay } from "./timer.js";
import * as actions from './actions.js';
import * as element from './elements.js';
import * as sounds from './sounds.js';
import { deactivateCard, activateCard} from './cards.js';

export function registerControls() {
  controls.addEventListener('click', (event) => {
    const action = event.target.dataset.action;

    if (typeof actions[action] != "function") return;

    actions[action]();
  })
}

export function registerCardsSound() {
  cardsSounds.addEventListener('click', (event) => {
    const cardButton = event.target.closest('.card');
    console.log(cardButton);

    if (cardButton) {
      const card = cardButton.dataset.card;
  
      sounds.stopAllSounds();
        
      if (state.activatedCard === cardButton) {
        deactivateCard();
        return;
      }
  
      sounds[`${card}Audio`].play();
  
      activateCard(cardButton);
    }
  });
}

export function setMinutes() {
  element.minutes.addEventListener('focus', () => {
    element.minutes.textContent = "";
  });

  element.minutes.onkeypress = (event) => /\d/.test(event.key);

  element.minutes.addEventListener('blur', (event) => {
    let minutes = event.currentTarget.textContent;
    minutes = minutes > 99 ? 99 : minutes;

    state.minutes = minutes;
    state.seconds = 0;

    updateTimerDisplay();
    element.minutes.removeAttribute('contenteditable');
  })
}