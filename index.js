let data2 = "";
const success = async (pos) => {
  latitude = pos.coords.latitude;
  longitude = pos.coords.longitude;
  await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=92be7c89067c4927ae2151448231110&q=${latitude},${longitude}&days=7`,
    { method: "get" }
  )
    .then((res) => res.text())
    .then((data) => {
      data2 = JSON.parse(data);
    });

  let newDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dateFormat = (date) => {
    const newDate = new Date(date);

    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = newDate.toLocaleDateString("fr-FR", options);

    return formattedDate;
  };

  document.body.innerHTML = `
    <div class="card">
    <div class="card-container">
      <p id="city">${data2.location.name}</p>
      <p id="country">${data2.location.country}</p>
      <p id="date">${newDate}</p>
      <img src="${data2.current.condition.icon}" alt="logo de la condition">
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
      <div class="forecast">
        <div class="dayOne">
        <img src="${
          data2.forecast.forecastday[1].day.condition.icon
        }" alt="logo de la condition" height="50px">
          <p class="key">${dateFormat(data2.forecast.forecastday[1].date)}</p>
          <p class="value">${data2.forecast.forecastday[1].day.mintemp_c}°/${
    data2.forecast.forecastday[1].day.maxtemp_c
  }°</p>
        </div>
        <div class="dayTwo">
        <img src="${
          data2.forecast.forecastday[2].day.condition.icon
        }" alt="logo de la condition" height="50px">
        <p class="key">${dateFormat(data2.forecast.forecastday[2].date)}</p>
        <p class="value">${data2.forecast.forecastday[2].day.mintemp_c}°/${
    data2.forecast.forecastday[2].day.maxtemp_c
  }°</p>
        </div>
        <div class="dayThree">
        <img src="${
          data2.forecast.forecastday[3].day.condition.icon
        }" alt="logo de la condition" height="50px">
        <p class="key">${dateFormat(data2.forecast.forecastday[3].date)}</p>
          <p class="value">${data2.forecast.forecastday[3].day.mintemp_c}°/${
    data2.forecast.forecastday[3].day.maxtemp_c
  }°</p>
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
