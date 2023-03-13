import './assets/scss/main.scss'
import { Loader } from '@googlemaps/js-api-loader'

const LOCATION = document.getElementById('city')
const BTN = document.getElementById('button')
const WEATHER_OUTPUT = document.querySelector('.weather__output')
const WEATHER_TODAY = document.querySelector('.weather__today')
const WEATHER_CONTENT = document.querySelector('.weather__content')
const WEATHER_LOCATION = document.querySelector('.weather__location')
const WEATHER_TIME = document.querySelector('.weather__time')
const WEATHER_ICON = document.querySelector('.weather__icon')
const WEATHER_TEMPERATURE = document.querySelector('.weather__temperature')

BTN.addEventListener('click', () => {
    if (LOCATION.value == '') {
        alert('Строка ввода пуста!')
    } else {
        removeElement()
        requestWeatherData(LOCATION.value)
    }
})

function addElement(data) {
    return WEATHER_CONTENT.insertAdjacentHTML(
        'beforeend',
        `<div class="weather__today">
        <div class="weather__location">${data.request.query}</div>
        <div class="weather__rows">
            <div class="weather__item">
                <div class="weather__conditions">
                    <div class="weather__day">${addDayWeek()}</div>
                    <div class="weather__time">${addDate()}</div>
                    <div class="weather__wind"> Wind ${data.current.wind_speed}km/h</div>
                </div>
            </div>
            <div class="weather__item">
                <div class="weather__img">
                    <img src="${data.current.weather_icons}" class="weather__icon" alt="No foto" />
                </div>
                <div class="weather__description">${data.current.weather_descriptions}</div>
            </div>
            <div class="weather__item">
                <div class="weather__temperature">${data.current.temperature}&#176</div>
            </div>
        </div>
    </div> `
    )
}

function requestWeatherData(name) {
    fetch(`http://api.weatherstack.com/current?access_key=4c7df571c31d1531bda10c1e9936f1d1&query=${name}`)
        .then((response) => response.json())
        .then((resp) => {
            addElement(resp)
        })
}

function removeElement() {
    while (WEATHER_CONTENT.firstChild) {
        WEATHER_CONTENT.removeChild(WEATHER_CONTENT.firstChild)
    }
}

function addDayWeek() {
    let arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let day = new Date().getDay()
    {
        for (let i = 0; i < arr.length; i++) {
            if (day === i) {
                day = arr[i]
                return day
            }
        }
    }
}

function addDate() {
    const day = new Date().getDay()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    return day + '/' + month + '/' + year
}
removeElement()
requestWeatherData('Minsk')

navigator.geolocation.getCurrentPosition((position) => {
    console.log(position)
})
