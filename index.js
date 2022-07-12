let weather = {
  vienna: {
    temperature: 24.2,
    humidity: 80,
  },
  paris: {
    temperature: 19.8,
    humidity: 60,
  },
};
let city = prompt("What is your city?");
if (weather[city] !== undefined) {
  let humidity = weather[city].humidity;
  let celsius = Math.round(weather[city].temperature);
  let fahrenheit = Math.round((weather[city].temperature * 9) / 5 + 32);
  alert(
    `It is currently ${celsius} °C (${fahrenheit}) °F in ${city} with a humidity of ${weather[city].humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather + ${city}`
  );
}
