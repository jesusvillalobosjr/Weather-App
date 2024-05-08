function celciusToFahrenheit(celcius) {
    return Math.round((celcius * (9/5)) + 32);
}

function fahrenheitToCelcius(fahrenheit) {
    return Math.round((fahrenheit - 32) * (5/9));
}

export {celciusToFahrenheit, fahrenheitToCelcius}