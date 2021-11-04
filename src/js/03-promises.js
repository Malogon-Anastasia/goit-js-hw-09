import { Notify } from 'notiflix';

const refs = {
  delayField: document.querySelector('input[name="delay"]'),
  stepField: document.querySelector('input[name="step"]'),
  amountField: document.querySelector('input[name="amount"]'),
  btn: document.querySelector('button[type="submit"]'),
  };

refs.btn.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();
  
  const { delayField, stepField, amountField } = refs;
  
  const amount = +amountField.value;
  const step = +stepField.value;
  let delay = +delayField.value;
  
  for (let i = 0; i < amount ; i ++) {
    const position = i + 1;
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
}
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

