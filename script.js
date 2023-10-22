const apiKey = "e6d7df5fe4a91d558c1a5e6a9edbcccf";

// collect data from HTML
const weatherDetailsEl = document.querySelector(".details-container");
const cityInputEl = document.querySelector(".cityInput");
const buttonClickEl = document.querySelector(".btn");
const formEl = document.querySelector("form");

// JavaScript code for handling city item clicks
const cityItems = document.querySelectorAll(".city-item");
let cityOption;

function handleCityItemClick() {
  cityItems.forEach((item) => item.classList.remove("selected"));
  this.classList.toggle("selected");
  cityOption = this.textContent;
}

for (let i = 0; i < cityItems.length; i++) {
  cityItems[i].addEventListener("click", handleCityItemClick);
}

const cityHandler = (e) => {
  e.preventDefault(); //terminate browser defualt behaviour

  //get the value from input
  getWeatherData(cityOption);
};

const formHandler = (e) => {
  e.preventDefault(); //terminate browser defualt behaviour

  //get the value from input
  const inputValue = cityInputEl.value;
  console.log(inputValue);
  cityInputEl.value = ""; //remove the value after submission

  getWeatherData(inputValue);
};

formEl.addEventListener("submit", formHandler);
formEl.addEventListener("submit", cityHandler);

const getWeatherData = async (inputValue) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);

    // Collect data from JSON
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels liks: ${Math.round(data.main.feels_like)}°c`,
      `Huminity: ${data.main.humidity}%`,
      `Wind Speed: ${Math.round(data.wind.speed)} m/s`,
    ];

    //Connect JSON with class
    weatherDetailsEl.querySelector(
      ".colud_image"
    ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="image">`;

    weatherDetailsEl.querySelector(".weather-degree").textContent =
      temperature + "°c";

    weatherDetailsEl.querySelector(".weather_description").textContent =
      description;

    weatherDetailsEl.querySelector(".weather-details").innerHTML = `
        <div>${details[0]}</div>
        <div>${details[1]}</div>
        <div>${details[2]}</div>
    `;
  } catch (error) {
    console.log("No data found");
  }
};
