window.addEventListener("load", () => {
  let long;
  let lat;
  const timezone = document.querySelector(".location-timezone");
  const weatherIcon = document.querySelector(".weather-icon");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const sunriseData = document.querySelector(".sunrise-data");
  const sunsetData = document.querySelector(".sunset-data");

  if (navigator.geolocation) {
    // get longitude and latitude
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude.toFixed(6);
      lat = position.coords.latitude.toFixed(6);

      const apiKey = "86d0881d8f9399f4b51f2a66922e1d9d";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const [weather] = data.weather;
          const { description, icon } = weather;
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          console.log(iconUrl);
          const { sunrise, sunset } = data.sys;
          console.log(new Date(sunrise * 1000));

          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Set DOM Elements from API
          timezone.textContent = data.name;
          weatherIcon.src = iconUrl;
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          sunriseData.textContent = `Sunrise: ${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetData.textContent = `Sunset: ${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});
