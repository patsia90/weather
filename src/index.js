import './assets/scss/main.scss'

const LOCATION = document.getElementById('city')
const BTN = document.getElementById('submit')
const WEATHER_OUTPUT = document.querySelector('.weather__output')
const WEATHER_LOCATION = document.querySelector('.weather__location')
const WEATHER_TIME = document.querySelector('.weather__time')
const WEATHER_ICON = document.querySelector('.weather__icon')
const WEATHER_TEMPERATURE = document.querySelector('.temperature')

BTN.addEventListener('click', () => {
    if (LOCATION.value == '') {
        alert('Строка ввода пуста!')
    } else {
        requestWeatherData(LOCATION.value)
        // WEATHER_OUTPUT.style.display = 'block'
    }
})

function addElement(data) {
    return WEATHER_TIME.insertAdjacentHTML('beforeend', `<p> ${new Date().toLocaleTimeString().slice(0, -6)}</p>`)
}

function requestWeatherData(name) {
    fetch(`http://api.weatherstack.com/current?access_key=4c7df571c31d1531bda10c1e9936f1d1&query=${name}`)
        .then((response) => response.json())
        .then((resp) => {
            addElement(resp)
        })
}
