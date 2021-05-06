let response
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let searchInput = document.querySelector(".search");
let lat;
let lon;
let cords
// function to get your location
function getLocation() {
    let options={
        enableHighAccuracy: true
    }
    function showPosition(l) {
        lat = l.coords.latitude;
        lon = l.coords.longitude;
        cords = lat + "," + lon;
        
        (async function () {
            let weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e5ffba3f06ab47b3a9103315210105&days=3&q=${cords}`)
            if (weatherData.ok && weatherData.status==200) {
                response = await weatherData.json();

                displayData()
            }

        })()

    }

    function error() {
        Search("cairo")
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, error,options);
    }


}
getLocation()
async function Search(searchValue) {
    if (searchValue == "") {
        getLocation()
    }
    let weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e5ffba3f06ab47b3a9103315210105&days=3&q=${searchValue}`)
    if (weatherData.ok &&  weatherData.status==200) {
        response = await weatherData.json();

        displayData()
    }
}
searchInput.addEventListener("keyup", a => {
    Search(a.target.value)
})
// display data function
function displayData() {
    // the first day
    let currentDay = document.getElementById("day")
    let currentMonth = document.getElementById("month")
    let city = document.querySelector(".city")
    let tempDeg = document.querySelector(".tempDeg")
    let icon = document.querySelector(".temp-icon img")
    let status = document.querySelector(".status")
    // the second day
    let nextDay = document.getElementById("day2")
    let nextDayIcon = document.getElementById("nextIcon")
    let maxTemp = document.getElementById("max-temp")
    let minTemp = document.getElementById("min-temp")
    let nextstatus = document.getElementById("next-status")
    // the third day
    let afterNextDay = document.getElementById("day3")
    let afterNextIcon = document.getElementById("afterNextIcon")
    let nextMaxTemp = document.getElementById("nextMaxTemp")
    let nextMinTemp = document.getElementById("nextMinTemp")
    let afterNextStatus = document.getElementById("afterNextStatus")
    // the first day
    currentDay.textContent = days[new Date(response.forecast.forecastday[0].date).getDay()]
    currentMonth.textContent = new Date(response.forecast.forecastday[0].date).getDate() + " " + months[new Date(response.forecast.forecastday[0].date).getMonth()]
    city.textContent = response.location.name
    tempDeg.textContent = response.current.temp_c
    icon.setAttribute("src", response.current.condition.icon)
    status.textContent = response.current.condition.text
    // the next day
    nextDay.textContent = days[new Date(response.forecast.forecastday[1].date).getDay()]
    nextDayIcon.setAttribute("src", response.forecast.forecastday[1].day.condition.icon)
    maxTemp.textContent = response.forecast.forecastday[1].day.maxtemp_c
    minTemp.textContent = response.forecast.forecastday[1].day.mintemp_c
    nextstatus.textContent = response.forecast.forecastday[1].day.condition.text
    // the third day
    afterNextDay.textContent = days[new Date(response.forecast.forecastday[2].date).getDay()]
    afterNextIcon.setAttribute("src", response.forecast.forecastday[2].day.condition.icon)
    nextMaxTemp.textContent = response.forecast.forecastday[2].day.maxtemp_c
    nextMinTemp.textContent = response.forecast.forecastday[2].day.mintemp_c
    afterNextStatus.textContent = response.forecast.forecastday[2].day.condition.text
}