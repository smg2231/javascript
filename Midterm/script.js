const api = {
  key: '603d3433ebb3e3f3018c4b2e7c61f1f2',
  base: 'https://api.openweathermap.org/data/2.5/weather',
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
  fetch(`${api.base}?q=${city}&appid=${api.key}&units=metric`)
    .then((res) => res.json())
    .then(showWeather)
    .catch((err) => console.error("Error fetching weather:", err));
}
function showWeather(details) {
  // City and country
  let city = document.getElementById('city');
  city.innerHTML = `${details.name}, ${details.sys.country}`;

  // Current temperature
  let temperature = document.getElementById('temp');
  temperature.innerHTML = `${Math.round(details.main.temp)}°C`;

  // Min and Max temperatures
  let minMax = document.getElementById('min-max');
  minMax.innerHTML = `${Math.round(
    details.main.temp_min
  )}°C (Min) and ${Math.round(details.main.temp_max)}°C (Max) `;

  // Weather condition
  let weatherType = document.getElementById('weather-type');
  weatherType.innerHTML = `${details.weather[0].main}`;
}
