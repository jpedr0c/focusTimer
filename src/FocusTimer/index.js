import state from "./state.js";
import * as events from './events.js';
import * as timer from './timer.js';
import * as card from './cards.js';

export function start(minutes, seconds) {
  state.minutes = minutes;
  state.seconds = seconds;

  timer.updateTimerDisplay();

  events.registerControls();
  events.registerCardsSound();
  events.setMinutes();
}