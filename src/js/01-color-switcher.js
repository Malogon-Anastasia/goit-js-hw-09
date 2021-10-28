const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => document.body.style.backgroundColor = getRandomHexColor(), 1000);
  toggleBtnsActiveStatus();
});


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  toggleBtnsActiveStatus();
});


function toggleBtnsActiveStatus() {
  refs.startBtn.toggleAttribute('disabled');
  refs.stopBtn.toggleAttribute('disabled');
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }