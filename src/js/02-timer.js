import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.1.0.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysLeft: document.querySelector('[data-days]'),
  hoursLeft: document.querySelector('[data-hours]'),
  minutesLeft: document.querySelector('[data-minutes]'),
  secondsLeft: document.querySelector('[data-seconds]'),
};

let intervalId = null;


const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (+selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      StartBtnState();
      return;
    } else {
      refs.startBtn.disabled = false;
    }
  },
});

refs.startBtn.addEventListener('click', start);

StartBtnState();

function StartBtnState() {
  refs.startBtn.disabled = true;
}

function start() {
  const targetDate = Number(fp.selectedDates[0]);

  intervalId = setInterval(() => {
    if (targetDate <= Date.now()) {
      clearInterval(intervalId);
      refs.inputEl.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(targetDate - Date.now());
    refs.daysLeft.innerHTML = pad(days);
    refs.hoursLeft.innerHTML = pad(hours);
    refs.minutesLeft.innerHTML = pad(minutes);
    refs.secondsLeft.innerHTML = pad(seconds);
  }, 1000);
  refs.inputEl.disabled = true;
  StartBtnState();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function pad(value) {
  return String(value).padStart(2, '0');
}



