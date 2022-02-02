/* Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. 
При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

⚠️ Учти, на кнопку «Start» можно нажать бесконечное количество раз. 
Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled). */

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]')
const btnStop = document.querySelector('button[data-stop]')
const COLOR_CHANGE_DELAY = 1000;
let timeoutid = null;

btnStart.addEventListener('click', onStartClick)
btnStop.addEventListener('click', onStopClick)

function onStartClick() {
    timeoutid = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, COLOR_CHANGE_DELAY);

    btnStart.setAttribute('disabled', 'disabled')
    btnStop.removeAttribute('disabled')
}

function onStopClick() {
    clearInterval(timeoutid)

    btnStart.removeAttribute('disabled')
    btnStop.setAttribute('disabled', 'disabled')
}