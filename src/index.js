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


function getForecast(city) {
let apiKey="bd5b4461863eddaa6ced0a0a67989e0a";
let apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);

}

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
  
    return days[date.getDay()];
  }



  function displayForecast(response) {
console.log(response.data);

    let forecastElement = document.querySelector("#forecast");
    let forecastHtml="";
  
    
    response.data.list.forEach(function(era, index) {
      if (index < 5) {
  forecastHtml=
  forecastHtml +
  `
  <div class="col">
    <div class=" weather-forecast">
      
    <h5 class="weather-date">${formatDay(era.dt)}</h5>
    <div class="weather-forecast-icon"> <img src= "https://openweathermap.org/img/wn/${era.weather[0].icon}@2x.png" />
    </div>
    <div class="weather-date-temperature">
      <span class="weather-date-minimum">
     ${Math.round(era.main.temp_max)}°
    </span>
    <span class="weather-date-maximum">
    ${Math.round(era.main.temp_min)}°
    </span>
    </div>
    </div>
    </div>
    </div>
    `;
  }
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
  getForecast("Paris");