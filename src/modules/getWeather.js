async function getWeather(location) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=420fa5346009407f944213502241204&q=${location}&days=3`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export default getWeather;