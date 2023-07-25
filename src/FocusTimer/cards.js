import state from "./state.js";
import * as sounds from './sounds.js';

export function deactivateCard() {
  if (state.activatedCard) {
    state.activatedCard.classList.remove('activated');
    state.activatedCard = null;
  }
}

export function activateCard(cardButton) {
  deactivateCard();
  state.activatedCard = cardButton;
  cardButton.classList.add('activated');
}
