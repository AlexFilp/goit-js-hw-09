import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  position: 'center-center',
  width: '400px',
  fontSize: '20px',
  cssAnimationStyle: 'zoom',
  showOnlyTheLastOne: true,
});

const startBtn = document.querySelector('[data-start]');

const refs = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

startBtn.disabled = true;

let isActive = false;
let futureTime = null;
let counterId = null;

const realTime = Date.now();
// console.log(realTime);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const date = new Date(selectedDates[0]);
    futureTime = date.getTime();
    // console.log(futureTime);

    if (realTime >= futureTime) {
      // window.alert('Please choose a date in the future');

      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      clearInterval(counterId);
    } else {
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', startCounter);

function startCounter() {
  if (isActive) {
    return;
  }

  isActive = true;

  console.log('START');

  counterId = setInterval(() => {
    const realTime = Date.now();
    // const futureTime = Date.now();
    const timeLeft = futureTime - realTime;
    const timeComp = convertMs(timeLeft);
    // console.log(timeComp);
    const { days, hours, minutes, seconds } = timeComp;
    console.log(`${days}:${hours}:${minutes}:${seconds}`);
    function updateClockFace({ days, hours, minutes, seconds }) {
      refs.daysEl.textContent = `${days}`;
      refs.hoursEl.textContent = `${hours}`;
      refs.minutesEl.textContent = `${minutes}`;
      refs.secondsEl.textContent = `${seconds}`;
    }
    updateClockFace({ days, hours, minutes, seconds });

    if (timeLeft < 1000) {
      clearInterval(counterId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
