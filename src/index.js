function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
  if(hours < 10) {
    hours = `0${hours}`
  }
  let minutes = date.getMinutes();
  if(minutes < 10) {
    minutes = `0${minutes}`  
  }
  
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
     let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
  
  }
  
  
  function displayTemperature(response) {
    
  let temperatureElement=document.querySelector("#temperature-icon");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#weather-condition");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
  
    celsiusTemp = response.data.main.temp
  
    temperatureElement.innerHTML=Math.round(celsiusTemp);
    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description);  
  }
  
  function look(city) {
  let apiKey= "bd5b4461863eddaa6ced0a0a67989e0a";
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
  axios.get(apiUrl).then(displayTemperature);
  }
  
  function find(event) {
    event.preventDefault();
    let findCityElement=document.querySelector("#find-city");
    look(findCityElement.value);
  }
  
  function displayFarrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-icon");
  celsius.classList.remove("active");
  farrenheit.classList.add("active");
  let farrenTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML= Math.round(farrenTemp);
  }
  
  function displayCelsius(event) {
    event.preventDefault();
    celsius.classList.add("active");
    farrenheit.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature-icon"); 
    temperatureElement.innerHTML = Math.round(celsiusTemp);
  }
  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let forecastHtml="";

    let period=["Thursday", "Friday", "Saturday", "Sunday"];
    period.forEach(function(era) {
 forecastHtml=
 forecastHtml +
 `
       <div class="weather-forecast-day">
      
        <div class="weather-forecast">
        <div class="weather-date">
    ${era}
    </div>
    <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" alt="" width="42"/>
    <br />
    <div class="weather-date-temperature">
      <span class="weather-date-minimum">
    23° 
    </span>
    <span class="weather-date-maximum">
    | 12°
    </span>
    </div>
      </div>
      </div>
      
    </div>
    `;
    });
  
forecastElement.innerHTML=forecastHtml;

   }
  
  let celsiusTemp = null;
  
  let form = document.querySelector("#form-input");
  form.addEventListener("submit", find)
  
  let farrenheit = document.querySelector("#farrenheit");
  farrenheit.addEventListener("click", displayFarrenheit)
  
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", displayCelsius)
  
  
  look("Paris");
 displayForecast();