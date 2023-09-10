const inputBox = document.querySelector ('.input-box');
const searchBtn = document.getElementById ('searchBtn');
const weather_img = document.querySelector ('.weather-img');
const temperature = document.querySelector ('.temperature');
const description = document.querySelector ('.description');
const humidity = document.getElementById ('humidity');
const wind_speed = document.getElementById ('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
async function checkWeather(city) {

    const api_key = "f8e97121f82c3ff97dddef31db851cab";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod == `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";


    if (weather_data.main && weather_data.main.temp) {
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    }
    
    if (weather_data.weather && weather_data.weather[0] && weather_data.weather[0].description) {
        description.innerHTML = weather_data.weather[0].description;
    }
    
    
    console.log(weather_data); 

    humidity.innerHTML = `${weather_data.main.humidity}%` ;
    wind_speed.innerHTML = `${weather_data.wind.speed}km/H`;


    switch (weather_data.weather[0].main) {
        case 'Clouds':
        weather_img.src = "cloud.png";
        break;

        case 'Clear':
        weather_img.src = "clear.png";
        break;

        case 'Rain':
        weather_img.src = "rain.png";
        break;

        case 'Mist':
        weather_img.src = "mist.png";
        break;

        case 'Snow':
        weather_img.src = "snow.png";
        break;




    }
    console.log(weather_data);
}


searchBtn.addEventListener ('click', ()=> {
    checkWeather(inputBox.value);
});