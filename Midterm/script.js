const api = {
  key: '603d3433ebb3e3f3018c4b2e7c61f1f2',
  base: 'https://api.openweathermap.org/data/2.5/weather',
  //https://api.openweathermap.org/data/2.5/weather?q=16601&appid=603d3433ebb3e3f3018c4b2e7c61f1f2&units=imperial
};
const Input = document.getElementById('input');

Input.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    getWeather(Input.value);

    // Display date and time using moment.js
    const date = moment();
    document.getElementById('date').innerHTML = date.format(
      'Mo MMM YYYY dddd, h:mm:ss'
    );

    // Show weather details (initially hidden)
    document.querySelector('.main-weather').style.display = 'block';
  }
});
function getWeather(city) {
  fetch(`${api.base}?q=${city}&appid=${api.key}&units=imperial`)
    .then((res) => res.json())
    .then(showWeather)
    .catch((err) => console.error("Error fetching weather:", err));
}
function showWeather(details) {
  // City and country
  let city = document.getElementById('city');
  city.innerHTML = `${details.name}, ${details.sys.country}`;
  let zipcode = document.getElementById('zipcode');
  zipcode.innerHTML = `Zipcode: ${details.sys.zipcode}`;

  // Current temperature
  let temperature = document.getElementById('temp');
  temperature.innerHTML = `${Math.round(details.main.temp)}°F`;

  // Min and Max temperatures
  let minMax = document.getElementById('min-max');
  minMax.innerHTML = `${Math.round(
    details.main.temp_min
  )}°F (Min) and ${Math.round(details.main.temp_max)}°F (Max) `;

  // Weather condition
  let weatherType = document.getElementById('weather-type');
  weatherType.innerHTML = `${details.weather[0].main}`;
}
