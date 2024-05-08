import {convertDateAndTimeFormat, convertDateToWeekDay} from "./convertDateAndTime";
import { fahrenheitToCelcius, celciusToFahrenheit } from "./temperatureConversions";
import getWeather from "./getWeather";

class WeatherAppUI {
    constructor(location) {
        this.location = location;
        this.locationData = null;
        this.degrees = 'c';
    }

    init() {
        this.setEvents();
    }

    setEvents() {
        this.setSearchButtonEvent();
        this.setDegreeConversionButtonEvent();
    }

    setSearchButtonEvent() {
        const searchButton = document.querySelector('.search-button');
        searchButton.addEventListener('click',(e) => this.handleSearchButtonClick(e));
    }

    setDegreeConversionButtonEvent() {
        const degreeConversion = document.querySelector('.degree-conversion');
        degreeConversion.addEventListener('click',() => this.handleDegreeConversionClick());
    }

    async handleSearchButtonClick(event) {
        event.preventDefault();
        const search = document.querySelector('.location-search');
        const searchInput = search.value;
        const data = await getWeather(searchInput);
        this.locationData = data;

        this.setCurrentWeatherInformation(data);

        const forecastSlots = document.querySelectorAll('.day-forecast');
        forecastSlots.forEach((forecastSlot,index) => this.setFutureForecast(forecastSlot,data.forecast.forecastday[index + 1]));

        console.log(data);
        search.value = '';
    }

    handleDegreeConversionClick() {
        this.degrees = this.isCelcius() ? 'f' : 'c';
        this.setWeather();
    }

    setWeather() {
        const currentDegrees = document.querySelector('.forecast-degree');
        currentDegrees.textContent = this.getDegreeConversion(currentDegrees);
        this.changeDegreeClass(currentDegrees.classList.item(0),currentDegrees);

        const forecastsHigh = document.querySelectorAll('.forecast-high');
        forecastsHigh.forEach(forecast => {
            forecast.textContent = this.getDegreeConversion(forecast);
            this.changeDegreeClass(forecast.classList.item(0), forecast);
        })

        const forecastsLow = document.querySelectorAll('.forecast-low');
        forecastsLow.forEach(forecast => {
            forecast.textContent = this.getDegreeConversion(forecast);
            this.changeDegreeClass(forecast.classList.item(0), forecast);
        })
    }

    getDegreeConversion(degreeContainer) {
        const degree = (this.isCelcius()) ? fahrenheitToCelcius(parseInt(degreeContainer.textContent)) : celciusToFahrenheit(parseInt(degreeContainer.textContent));
        return degree;
    }

    setCurrentWeatherInformation(data) {
        const description = document.querySelector('.forecast-description');
        description.textContent = data.current.condition.text;

        const location = document.querySelector('.forecast-location');
        location.textContent = `${data.location.name}, ${data.location.region}`

        const dateAndTime = document.querySelector('.forecast-date-and-time');
        dateAndTime.textContent = convertDateAndTimeFormat(data.location.localtime);

        const degree = document.querySelector('.forecast-degree');
        this.changeDegreeClass('forecast-degree',degree);
        degree.textContent = this.isCelcius() ? Math.round(data.current.temp_c) : Math.round(data.current.temp_f);

        const icon = document.querySelector('.forecast-icon');
        icon.src = data.current.condition.icon;
    }

    setFutureForecast(forecastSlot,forecast) {
        const [weekday, highTemp, lowTemp, icon] = forecastSlot.children;
        weekday.textContent = convertDateToWeekDay(forecast.date);

        this.changeDegreeClass('forecast-high',highTemp);
        highTemp.textContent = this.isCelcius() ? Math.round(forecast.day.maxtemp_c) : Math.round(forecast.day.maxtemp_f);

        this.changeDegreeClass('forecast-low',lowTemp);
        lowTemp.textContent = this.isCelcius() ? Math.round(forecast.day.mintemp_c) : Math.round(forecast.day.mintemp_f);

        icon.src = forecast.day.condition.icon;
    }

    changeDegreeClass(defaultClass,degreeContainer) {
        degreeContainer.classList = this.isCelcius() ? `${defaultClass} celcius` : `${defaultClass} fahrenheit`;
    }

    isCelcius() {
        return this.degrees === 'c';
    }
}

export default WeatherAppUI;