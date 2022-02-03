import Notiflix from 'notiflix';

Notiflix.Notify.init({
    position: 'right-top',
    width: '400px',
    fontSize: '18px',
});

const form = document.querySelector('.form')
form.addEventListener('submit', onPromiseForm);

function onPromiseForm(e) {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const { delay, step, amount } = elements;
    let amountValue = Number(amount.value);
    let stepTime = Number(step.value);
    let delayTime = Number(delay.value);

    generatePromises(amountValue, delayTime);

    e.target.reset();

    function generatePromises(amountValue, delayTime) {
        let position = null;

        for (let i = 0; i < amountValue; i++) {
            if (i > 0) {
                delayTime += stepTime;
            }

            position += 1;

            createPromise(position, delayTime)
                .then(({ position, stepTime }) => {
                    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${stepTime}ms`);
                })
                .catch(({ position, stepTime }) => {
                    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${stepTime}ms`);
                });

            function createPromise(position, stepTime) {
                const shouldResolve = Math.random() > 0.3;
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (shouldResolve) {
                            resolve({ position, stepTime });
                        } else {
                            reject({ position, stepTime });
                        }
                    }, delayTime);
                })
            }
        }
    }


}