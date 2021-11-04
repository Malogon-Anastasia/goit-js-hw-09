import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('.js-btn'),
};

let isActive = false;

refs.btn.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();
  const { delay, step, amount } = Object.fromEntries(new FormData(refs.form));
  if (isActive) {
    return;
  }
  disableAlerter(delay, step, amount);
  for (let i = 1; i <= amount ; i += 1) {
    createPromise(i, Number(delay) + Number(step) * i)
      .then(onSuccess)
      .catch(onError);
  }
}
function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { clickToClose: true });
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { clickToClose: true });
}


function disableAlerter(delay, step, amount) {
  isActive = true;
  setTimeout(() => (isActive = false), Number(delay) + Number(step) * amount);
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

