const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.body,
};

let isActive = false;
let intervalId = null;
startBtn.disabled = false;

refs.startBtn.addEventListener('click', makeRandomColor);

function makeRandomColor() {
  if (isActive) {
    return;
  }
  isActive = true;
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

refs.stopBtn.addEventListener('click', stopRandomColor);

function stopRandomColor() {
  clearInterval(intervalId);
  isActive = false;
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
