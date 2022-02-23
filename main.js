const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const tempElementMax = document.querySelector(".temperature-value-max p");
const tempElementMin = document.querySelector(".temperature-value-min p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


const weather = {};

weather.temperature = {
    unit: "celsius"
}
weather.temperature_max = {
    unit: "celsius"
}
weather.temperature_min = {
    unit: "celsius"
}
 
const KELVIN = 273;
const key = "758dd5ebda98223883cffa6281b60ea3";


if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Your browser does not support Geolocation</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.temperature_max.value = Math.floor(data.main.temp_max - KELVIN);
            weather.temperature_min.value = Math.floor(data.main.temp_min - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

        })
        .then(function () {
            displayWeather();
        });
}


function displayWeather() {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    tempElementMax.innerHTML = `${weather.temperature_max.value}°<span>C</span>`;
    tempElementMin.innerHTML = `${weather.temperature_min.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}


function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

const list = [tempElement, tempElementMax, tempElementMin]

function looper(list) {
    for (var i = 0; i < list.length; i++) {
        return list[i]
    }
}

looper(list).addEventListener("click", function () {
    if (weather.temperature.value === undefined || weather.temperature_max.value === undefined || weather.temperature_min.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";

        // Temp Max
        let fahrenheitMax = celsiusToFahrenheit(weather.temperature_max.value);
        fahrenheitMax = Math.floor(fahrenheitMax);

        tempElementMax.innerHTML = `${fahrenheitMax}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";

        // Temp Min
        let fahrenheitMin = celsiusToFahrenheit(weather.temperature_min.value);
        fahrenheitMin = Math.floor(fahrenheitMin);

        tempElementMin.innerHTML = `${fahrenheitMin}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";


    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"

        tempElementMax.innerHTML = `${weather.temperature_max.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"

        tempElementMin.innerHTML = `${weather.temperature_min.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

