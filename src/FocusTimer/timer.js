import state from "./state.js";
import { reset } from './actions.js';
import * as element from './elements.js';
import * as sounds from './sounds.js';

export function countdown() {
  let countdownTimeoutId;

  if (!state.isRunning || state.isCounting) return;
  
  state.isCounting = true;

  let minutes = Number(element.minutes.textContent);
  let seconds = Number(element.seconds.textContent);

  seconds--;

  if (seconds < 0) {
    minutes--;
    seconds = 59;
  }

  if (minutes < 0) {
    reset();
    sounds.kitchenTimer.play();
    state.isCounting = false;
    return;
  }

  updateTimerDisplay(minutes, seconds);

  if (countdownTimeoutId)
    clearTimeout(countdownTimeoutId);

  countdownTimeoutId = setTimeout(() => {
    state.isCounting = false;
    countdown();
  }, 1000);
}

export function updateTimerDisplay(minutes, seconds) {
  minutes = minutes ?? state.minutes;
  seconds = seconds ?? state.seconds;
  
  element.minutes.textContent = String(minutes).padStart(2, "0");
  element.seconds.textContent = String(seconds).padStart(2, "0");
}