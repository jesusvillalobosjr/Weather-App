async function getWeather(location) {
    try{
        const url = `http://api.weatherapi.com/v1/forecast.json?key=420fa5346009407f944213502241204&q=${location}&days=3`;
        const response = await fetch(url);
        if(!location){
            throw new Error('Please type in a location.')
        }
        if(!response.ok){
            throw new Error('Location not found, please try another location.');
        }
        const data = await response.json();
        return data;
    } catch(error) {
        throw new Error(error.message);
    }
}

export default getWeather;