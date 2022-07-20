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
dates.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}, ${currentHour}:${currentMinutes}`;
function displayImage(icon) {
  let iconPath = "";
  if (icon === `01d` || icon === "01n") {
    iconPath = "img/clegarSky.svg";
  } else if (icon === `02d` || icon === "02n") {
    iconPath = "img/fewClouds.svg";
  } else if (icon === `03d` || icon === `03n`) {
    iconPath = "img/scatteredClouds.svg";
  } else if (icon === `04d` || icon === `04n`) {
    iconPath = "img/brokenClouds.svg";
  } else if (icon === `09d` || icon === `09n`) {
    iconPath = "img/showerRain.svg";
  } else if (icon === `10d` || icon === `10n`) {
    iconPath = "img/rain.svg";
  } else if (icon === `11d` || icon === `11n`) {
    iconPath = "img/thunderstorm.svg";
  } else if (icon === `13d` || icon === `13n`) {
    iconPath = "img/snow.svg";
  } else if (icon === `50d` || icon === `50n`) {
    iconPath = "img/mist.svg";
  } else {
    iconPath = "img/clearSky.svg";
  }

  return iconPath;
}

let cities = document.querySelector("#city");
function showTemperature(response) {
  document.querySelector(".degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  const description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].main;
  const humidity = document.querySelector(".humidity");
  humidity.innerHTML = response.data.main.humidity;
  const speed = document.querySelector(".speed");
  speed.innerHTML = Math.round(response.data.wind.speed);
  let image = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  image.setAttribute("src", displayImage(icon));
}
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
  const description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].main;
  const humidity = document.querySelector(".humidity");
  humidity.innerHTML = response.data.main.humidity;
  const speed = document.querySelector(".speed");
  speed.innerHTML = Math.round(response.data.wind.speed);
  let image = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  image.setAttribute("src", displayImage(icon));
}
function currentPosition(position) {
  let apiKey = "6d832849a381b4b67880dd123f70a4c7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(changeCity);
}
function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
gpsButton.addEventListener("click", getCurrentPosition);
