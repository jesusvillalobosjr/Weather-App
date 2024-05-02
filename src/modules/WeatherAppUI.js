import {convertDateAndTimeFormat, convertDateToWeekDay} from "./convertDateAndTime";
import getWeather from "./getWeather";

class WeatherAppUI {
    constructor(location) {
        this.location = location;
    }

    init() {
        this.setEvents();
    }

    setEvents() {
        this.setSearchButtonEvent();
    }

    setSearchButtonEvent() {
        const searchButton = document.querySelector('.search-button');
        searchButton.addEventListener('click',(e) => this.handleSearchButtonClick(e));
    }

    async handleSearchButtonClick(event) {
        event.preventDefault();
        const search = document.querySelector('.location-search');
        const searchInput = search.value;
        const data = await getWeather(searchInput);

        this.setCurrentWeatherInformation(data);

        const forecastSlots = document.querySelectorAll('.day-forecast');
        forecastSlots.forEach((forecastSlot,index) => this.setFutureForecast(forecastSlot,data.forecast.forecastday[index]));

        console.log(data);
        search.value = '';
    }

    setCurrentWeatherInformation(data) {
        const description = document.querySelector('.forecast-description');
        description.textContent = data.current.condition.text;

        const location = document.querySelector('.forecast-location');
        location.textContent = `${data.location.name}, ${data.location.region}`

        const dateAndTime = document.querySelector('.forecast-date-and-time');
        dateAndTime.textContent = convertDateAndTimeFormat(data.location.localtime);

        const degree = document.querySelector('.forecast-degree');
        degree.textContent = data.current.temp_c;

        const icon = document.querySelector('.forecast-icon');
        icon.src = data.current.condition.icon;
    }

    setFutureForecast(forecastSlot,forecast) {
        const [weekday, highTemp, lowTemp, icon] = forecastSlot.children;
        weekday.textContent = convertDateToWeekDay(forecast.date);
        highTemp.textContent = forecast.day.maxtemp_c;
        lowTemp.textContent = forecast.day.mintemp_c;
        icon.src = forecast.day.condition.icon;
    }
}

export default WeatherAppUI;