const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    console.log(`I love async JS!  ${getRandomHexColor()}`);
  }, 1000);
});


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }