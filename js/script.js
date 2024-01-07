const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiMeasure = "&units=metric";

var input = document.querySelector("input");
const weather = document.querySelector(".weather");
var weatherIcon = document.getElementById("weather-icon");
var temp = document.querySelector(".temp");
var city = document.querySelector(".city");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var error = document.querySelector(".error")
var errorMsg = document.querySelector(".error p")
const button = document.querySelector(".search button")

input.addEventListener("keypress", function(a){
	if (a.key === "Enter") {
		checkWeather()
	}
})

async function checkWeather() {

	var inputName = input.value;
	const response = await fetch(apiUrl + `&q=${inputName}` + `&appid=${apiKey}` + apiMeasure);

	if (response.status == 404) {
		errorMsg.textContent = "Sorry, I can't find that city"
		error.style.display = "block"
		error.style.animation = "error 1s forwards"
		weather.style.display = "none";
		(document.querySelector("input").style = "margin"), "auto";
		input.value = "";
	} else if (response.status == 400) {
		errorMsg.textContent = "You need to type a city name above"
		error.style.display = "block"
		error.style.animation = "error 1s forwards"
		weather.style.display = "none";
		(document.querySelector("input").style = "margin"), "auto";
		input.value = "";
	} else {
		var data = await response.json();
		error.style.display = "none"
		input.value = "";
		weather.style.display = "block";
		weather.style.animation = "grow 1s forwards"

		if (data.weather[0].main == "Clouds") {
			weatherIcon.src = "images/clouds.png";
		} else if (data.weather[0].main == "Rain") {
			weatherIcon.src = "images/rain.png";
		} else if (data.weather[0].main == "Snow") {
			weatherIcon.src = "images/snow.png";
		} else if (data.weather[0].main == "Clear") {
			weatherIcon.src = "images/clear.png";
		} else if (data.weather[0].main == "Drizzle") {
			weatherIcon.src = "images/drizzle.png";
		} else if (data.weather[0].main == "Mist") {
			weatherIcon.src = "images/mist.png";
		} else if (data.weather[0].main == "Wind") {
			weatherIcon.src = "images/wind.png";
		}

		let tData = data.main.temp;
		let cData = data.name;
		let hData = data.main.humidity;
		let wData = data.wind.speed;

		temp.textContent = `${Math.floor(tData)}°c`;
		city.textContent = cData;
		humidity.textContent = `${hData}%`;
		wind.textContent = `${wData} km/h`;
	}

}
