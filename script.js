const weatherForm = document.querySelector('form');
const cityInput = document.querySelector('#locationName');
const card = document.querySelector('.card');
// const apiKey = "36684b12ddb5a86da4560c99ced6468c";


weatherForm.addEventListener('submit',event => {
    event.preventDefault();

    const city = cityInput.value.trim();
    if (city) {
        
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=2&language=en&format=json`;
        
        // displaying city name for debuggin
        console.log(city);

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Geocoding not available');
            }
            return response.json(); // parse data as json obj
        }) 
        .then(data => {
            // console.log(data);
            getWeatherData(data); // sending lat and long coord data into the function for fetching weather data
        })
        .catch(error =>{
            console.error(error);  // Log errors if any
        });
    }
    else
    {
        alert("Please Enter a City.");
    }

});



function getWeatherData(coordinates){
    const data = coordinates;

    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&forecast_days=3`;
    fetch(weatherUrl)
    .then(response =>{
        if(!response.ok){
            throw new Error('Weather Network not available');
        }
        return response.json();
    })
    .then(data => displayWeatherInfo(data))

    .catch(error => console.error(error)
    );    
}



function displayWeatherInfo(data){

    const maxTemp = data.daily.temperature_2m_max;
    const minTemp = data.daily.temperature_2m_min;
    const windSpeed = data.daily.wind_speed_10m_max;
    const windGust = data.daily.wind_gusts_10m_max;
    const weatherCode = data.daily.weather_code;
    const weatherDay = data.daily.time;
  
    const mainSection = document.querySelector('section');

    // making suree
    mainSection.innerHTML = "";

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


    for (let i = 0; i < weatherDay.length; i++) {
        
        const cardElement = document.createElement('card');
        const h1Day = document.createElement('h1');
        const h4Temp = document.createElement('h4');
        const h4WeatherCode = document.createElement('h4');
        const h4WindSpeed = document.createElement('h4');
        const h4WindGust = document.createElement('h4');



        h1Day.innerHTML = weatherDay[i];
        cardElement.append(h1Day);

        h4Temp.innerHTML = `Max / Min <br> ${maxTemp[i]} / ${minTemp[i]} &#x2103 `;
        cardElement.append(h4Temp);


        if (weatherCode[i] > 0 && weatherCode[i] < 4) {
            h4WeatherCode.innerHTML = "Mainly clear/Partly Cloudy";
        }
        if (weatherCode[i] > 44 && weatherCode[i] < 49) {
            h4WeatherCode.innerHTML = "Fog";
        }
        if (weatherCode[i] > 50 && weatherCode[i] < 56) {
            h4WeatherCode.innerHTML = "Drizzle";
        }
        if (weatherCode[i] > 57 && weatherCode[i] < 58) {
            h4WeatherCode.innerHTML = "Frezzing Drizzle";
        }
        if (weatherCode[i] > 60 && weatherCode[i] < 66) {
            h4WeatherCode.innerHTML = "Rain";
        }
        if (weatherCode[i] > 65 && weatherCode[i] < 68) {
            h4WeatherCode.innerHTML = "Freezing Rain";
        }
        if (weatherCode[i] > 70 && weatherCode[i] < 76) {
            h4WeatherCode.innerHTML = "Snow Fall";
        }
        if (weatherCode[i] == 77) {
            h4WeatherCode.innerHTML = "Snow Grains";
        }
        if (weatherCode[i] > 79 && weatherCode[i] < 83) {
            h4WeatherCode.innerHTML = "Rain Showers";
        }
        if (weatherCode[i] > 84 && weatherCode[i] < 87) {
            h4WeatherCode.innerHTML = "Heavy Snow Showers";
        }
        if (weatherCode[i] == 95) {
            h4WeatherCode.innerHTML = "Thunderstorm";
        }
        if (weatherCode[i] > 95 && weatherCode[i] < 100) {
            h4WeatherCode.innerHTML = "Thunderstorm with Heavy hail";
        }
        if (weatherCode[i] == 0) {
            h4WeatherCode.innerHTML = "Sunny / Clear Sky";
        }
       
        h4WindSpeed.innerHTML = `Wind Speed <br> ${windSpeed[i]} Km/H`;
        h4WindGust.innerHTML = `Wind Gust <br> ${windGust[i]} Km/H`;

        cardElement.append(h4WeatherCode);
        cardElement.append(h4WindSpeed);
        cardElement.append(h4WindGust);
        cardElement.setAttribute("class",`card col-12 col-sm-12 col-md-9 col-lg-3 col-xl-3 col-xxl-3 p-2 mx-1 my-1`);
        mainSection.append(cardElement);

    } 
}

const btnCovering = document.getElementsByClassName('toggleCovering');
const btnInside = document.getElementById('lightDarkBtn');
const body = document.body;


let mode = "light";


const lightDark = () =>
{
    if(mode == "light")
        {
            btnInside.setAttribute('class','toggleInsideDark');
            body.style.backgroundImage = "url('./assets/blackhole.jpg')";
            mode = "dark";
            return mode;
        }
        if(mode == "dark")
        {
            btnInside.setAttribute("class",'toggleInsideLight');
            body.style.backgroundImage = "url(https://images.surfacemag.com/app/uploads/2021/10/26180457/dune-2021-remake-02.jpg)";
            mode = "light";
            return mode;
        }
}

const toggleMode = () =>
{
    btnInside.addEventListener('click', lightDark)    
}

toggleMode();
