import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  position: 'center-center',
  width: '400px',
  fontSize: '20px',
  cssAnimationStyle: 'fade',
});

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  // let delaySum = delay;
  const step = event.target.elements.step.value;
  const amount = event.target.elements.amount.value;
  console.log(delay);
  console.log(step);
  console.log(amount);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, step * i + delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
