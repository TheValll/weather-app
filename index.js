const success = async (pos) => {
  let data2 = "";
  latitude = pos.coords.latitude;
  longitude = pos.coords.longitude;
  // console.log(latitude, longitude);
  await fetch(
    `https://api.weatherapi.com/v1/current.json?key=92be7c89067c4927ae2151448231110&q=${latitude},${longitude}`,
    { method: "get" }
  )
    .then((res) => res.text())
    .then((data) => {
      data2 = JSON.parse(data);
      console.log(data2);
    });

  document.body.innerHTML = `
    <div class="card">
    <div class="card-container">
      <p id="city">${data2.location.name}</p>
      <p id="country">${data2.location.country}</p>
      <p id="condition">${data2.current.condition.text}</p>
      <p id="temp">${data2.current.temp_c}°</p>  
      <div class="info">
        <div class="precipitation">
          <i class="fa-solid fa-cloud-rain"></i>
          <p class="key">Precipitation</p>
          <p class="value">${data2.current.precip_in}%</p>
        </div>
        <div class="humidity">
          <i class="fa-solid fa-temperature-half"></i>
          <p class="key">Humidity</p>
          <p class="value">${data2.current.humidity}%</p>
        </div>
        <div class="wind">
          <i class="fa-solid fa-wind"></i>
          <p class="key">Wind speed</p>
          <p class="value">${data2.current.wind_kph} km/h</p>
        </div>
      </div>
    </div>
  </div>
      `;
};

const error = () => {
  console.log("error");
};
const displayWeather = () => {
  navigator.geolocation.getCurrentPosition(success, error);
};

displayWeather();
