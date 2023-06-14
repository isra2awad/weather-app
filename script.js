const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const locationInput = document.querySelector(".search-box input");
const weatherBoxImage = document.querySelector(".weather-box img");
const weatherBoxTemp = document.querySelector(".weather-box .temperature");
const weatherBoxDesc = document.querySelector(".weather-box .description");
const weatherDetailsHumidity = document.querySelector(
  ".weather-details .humidity span"
);
const weatherDetailsWind = document.querySelector(
  ".weather-details .wind span"
);

// event Listener

searchButton.addEventListener("click", fetchData);

// functions

async function fetchData(e) {
  const apiKey = "ca55cd01e11924a413710f7d798c43c7";
  const city = locationInput.value;
  if (city === "") return;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
      { mode: "cors" }
    );

    const data = await response.json();

    if (data.cod === "404") {
      container.style.height = "400px";
      error404.style.display = "block";
      error404.classList.add("fadeIn");
      weatherBox.style.display = "none";
      weatherDetails.style.display = "none";
      return;
    }
    error404.style.display = "none";
    error404.classList.remove("fadeIn");

    switch (data.weather[0].main) {
      case "Clear":
        weatherBoxImage.src = "./images/clear.png";
        break;
      case "Rain":
        weatherBoxImage.src = "./images/rain.png";
        break;
      case "Snow":
        weatherBoxImage.src = "./images/snow.png";
        break;
      case "Clouds":
        weatherBoxImage.src = "./images/cloud.png";
        break;
      case "Haze":
        weatherBoxImage.src = "./images/haze.png";
        break;

      default:
        weatherBoxImage.src = "";
    }
    weatherBoxTemp.innerHTML = `${parseInt(data.main.temp)} <span>°C</span>`;
    weatherBoxDesc.innerHTML = `${data.weather[0].description}`;
    weatherDetailsHumidity.innerHTML = `${data.main.humidity}%`;
    weatherDetailsWind.innerHTML = `${parseInt(data.wind.speed)} 
    km/h`;

    weatherBox.style.display = "";
    weatherDetails.style.display = "";
    container.style.height = "590px";
    weatherDetails.classList.add("fadeIn");
    weatherBox.classList.add("fadeIn");
  } catch {
    function handleError(err) {
      alert("ops");
      console.log(err);
    }
  }
}
