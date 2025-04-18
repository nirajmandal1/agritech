const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const API_KEY = "b0f3d5450d3f3a364bd62cf12115b6ce";

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server/database is always in another continent
    try {
      const weatherData = await getFetchData(city);
      displayWeatherData(weatherData);
      
    } catch (error) {
     console.log(error);
     
    }
    cityInput.value =""; // clear input field
})
async function getFetchData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(apiurl);

    if (!response.ok) {
        const message = document.querySelector('.errorshow');
        //const error = throw new Error("City Aman Raj is not found");
        const error = new Error("City is not found");
        message.textContent = error.message;
        throw error;
    }
    const data = await response.json();
    return data; 

}
function displayWeatherData(data) {
    const cityNameDisplay = document.querySelector('.cityName');
    const temperatureDisplay = document.querySelector('.temp-txt');
    const conditionDisplay = document.querySelector('.condition-txt');
    const humiditvalueDispaly = document.querySelector('.humidity-value-txt');
    const windvalueDisplay = document.querySelector('.wind-value-txt');
    

    console.log(data);

    const { name, main, weather, wind } = data;
    cityNameDisplay.textContent =name;
    temperatureDisplay.textContent = `${main.temp}°C`;
    conditionDisplay.textContent = weather[0].description;
    humiditvalueDispaly.textContent = `${main.humidity}%`;
    windvalueDisplay.textContent = `${wind.speed}km/h`;

    // if (main.temp > 25) {
    //     document.weather-icon.style.img = "url('images/warm.jpg')";
    // } else if (main.temp < 25 && main.temp > 15) {
    //     document.body.style.weather-icon = "url('images/mild.jpg')";
    // } else {
    //     document.body.style.weather-icon = "url('images/cold.jpg')";
    // }       

    
}
//Date
function displayCurrentDate() {
    const dateDisplay = document.querySelector('.current-date-txt');
    let myDate = new Date()
    console.log(myDate.toDateString());
    dateDisplay.textContent = myDate.toDateString();
}
displayCurrentDate();

