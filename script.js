let time = document.querySelector("#time");
let now = new Date();
let dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
][now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

time.innerHTML = `${dayOfWeek} ${hours}:${minutes}`;


function searchCity(city) {
  let apiKey = "3b009f8c7f78b32731d19b7ddd5b7a4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let passwordInput = document.querySelector("#search");
  let enteredCity = document.querySelector("#city");
  enteredCity.innerHTML = `${passwordInput.value}`;
  let city = passwordInput.value;
  searchCity(city);
}

searchCity("New York");

let search = document.querySelector("#search-form");
search.addEventListener("submit", showCity);

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature}`;
  let description = document.querySelector("#weather");
  description.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function showCurrentCity(event) {
  event.preventDefault();
  function showWeather(response) {
    let temp = document.querySelector("#temp");
    let temperature = Math.round(response.data.main.temp);
    temp.innerHTML = `${temperature}`;
    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = response.data.name;
    let description = document.querySelector("#weather");
    description.innerHTML = response.data.weather[0].description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }

  function retrievePosition(position) {
    let apiKey = "3b009f8c7f78b32731d19b7ddd5b7a4d";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let checkCity = document.querySelector("#check");
checkCity.addEventListener("click", showCurrentCity);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let fahrenheitTemperature = (celsiusTemperature*9/5)+32;

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
