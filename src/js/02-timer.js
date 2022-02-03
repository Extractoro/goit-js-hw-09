import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/material_blue.css');

Notiflix.Notify.init({
    fontSize: '20px',
    position: 'right-top',
});

const btnStart = document.querySelector('[data-start]')
const btnReset = document.querySelector('[data-reset]')
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')


const options = {
    enableTime: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            btnStart.setAttribute('disabled', 'disabled')
            Notiflix.Notify.failure('😡 Wrong date!')
        } else {
            btnStart.removeAttribute('disabled', 'disabled')
            Notiflix.Notify.success('😇 Success Date!')
        }
    },
};

const fp = flatpickr("#datetime-picker", options)

class Timer {
    constructor({ onTick }) {
        this.timerId = null
        this.selectedTime = null
        this.onTick = onTick
    }

    start() {
        this.selectedTime = fp.selectedDates[0].getTime()

        this.timerId = setInterval(() => {
            const deltaTime = this.selectedTime - Date.now()

            if (deltaTime < 0) {
                clearInterval(this.timerId);
                return
            }

            const time = this.convertMs(deltaTime)
            console.log(time);

            this.onTick(time)
        }, 1000)
    }

    reset() {
        clearInterval(this.timerId);
        fp.setDate(new Date());
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
    }

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = this.pad(Math.floor(ms / day));
        const hours = this.pad(Math.floor((ms % day) / hour));
        const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }
    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTick: onDateChange,
})

btnStart.addEventListener('click', () => {
    btnStart.setAttribute('disabled', true)
    timer.start()
})
btnReset.addEventListener('click', () => {
    btnStart.removeAttribute('disabled', true)
    timer.reset()
})

function onDateChange({ days, hours, minutes, seconds }) {
    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minutesEl.textContent = `${minutes}`;
    secondsEl.textContent = `${seconds}`;
}