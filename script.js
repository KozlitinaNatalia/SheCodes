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

// function showCity(event) {
//   event.preventDefault();
//   let passwordInput = document.querySelector("#search");
//   let enteredCity = document.querySelector("#city");
//   enteredCity.innerHTML = `${passwordInput.value}`;
// }

// let search = document.querySelector("#search-form");
// search.addEventListener("submit", showCity);

// function showTemperature(event) {
//   event.preventDefault();
//   let celsius = document.querySelector("#temp");
//   celsius.innerHTML = 26;
// }

// let celsiusTemperature = document.querySelector("#celsius");
// celsiusTemperature.addEventListener("click", showTemperature);

// function showTemp(event) {
//   event.preventDefault();
//   let fahrenheit = document.querySelector("#temp");
//   fahrenheit.innerHTML = 79;
// }

// let temperature = document.querySelector("#fahrenheit");
// temperature.addEventListener("click", showTemp);

function showCity(event) {
  event.preventDefault();
  let passwordInput = document.querySelector("#search");
  let enteredCity = document.querySelector("#city");
  enteredCity.innerHTML = `${passwordInput.value}`;
  let city = passwordInput.value;
  let apiKey = "3b009f8c7f78b32731d19b7ddd5b7a4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", showCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature} °C`;
  let description = document.querySelector("#weather");
  description.innerHTML = response.data.weather[0].description;
}

function showCurrentCity(event) {
  event.preventDefault();
  function showWeather(response) {
    let temp = document.querySelector("#temp");
    let temperature = Math.round(response.data.main.temp);
    temp.innerHTML = `${temperature} °C`;
    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = response.data.name;
    let description = document.querySelector("#weather");
    description.innerHTML = response.data.weather[0].description;
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
