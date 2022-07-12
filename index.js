let dates = document.querySelector("#date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentYear = now.getFullYear();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = "0" + currentMinutes;
}
let cities = document.querySelector("#city");
function showTemperature(response) {
  document.querySelector(".degrees").innerHTML = Math.round(
    response.data.main.temp
  );
}
dates.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}, ${currentHour}:${currentMinutes}`;
function getWeather(city) {
  event.preventDefault();
  let cityInput = document.querySelector(".searchInput").value;
  let apiKey = "6d832849a381b4b67880dd123f70a4c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function changeCity(event) {
  let cityInput = document.querySelector(".searchInput").value;
  event.preventDefault();
  cities.innerHTML = cityInput;
  getWeather(cityInput);
}
let submitForm = document.querySelector("form");
submitForm.addEventListener("submit", changeCity);
let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", changeCity);
let gpsButton = document.querySelector("#gpsbutton");
function showWeather(response) {
  cities.innerHTML = response.data.name;
  document.querySelector(".degrees").innerHTML = Math.round(
    response.data.main.temp
  );
}
function currentPosition(position) {
  let apiKey = "6d832849a381b4b67880dd123f70a4c7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
gpsButton.addEventListener("click", getCurrentPosition);

