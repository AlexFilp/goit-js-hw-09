import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');

const refs = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

startBtn.disabled = true;

let futureTime = null;

const realTime = Date.now();
console.log(realTime);

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

    if (realTime > futureTime) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', startCounter);

function startCounter() {
  setInterval(() => {
    const realTime = Date.now();
    // const futureTime = Date.now();
    timeLeft = futureTime - realTime;
    timeComp = convertMs(timeLeft);
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
  }, 1000);
  console.log('START');
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
