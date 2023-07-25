import state from "./state.js";
import * as timer from './timer.js';
import * as element from './elements.js';
import * as sounds from './sounds.js';

export function toggleRunning () {
  state.isRunning = document.documentElement.classList.toggle('running');
  timer.countdown();
  sounds.buttonPressAudio.play();
}

export function setTimer () {
  element.minutes.setAttribute('contenteditable', true);
  element.minutes.focus();
}

export function reset () {
  state.isRunning = false;
  document.documentElement.classList.remove('running');
  timer.updateTimerDisplay();
  sounds.buttonPressAudio.play();
}