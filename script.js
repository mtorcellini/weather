//get weather for an example location

const apiKey = "";
//zip code
// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}

//location name
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

function weatherByZip(zipcode) {
    let reqUrl = "http://api.openweathermap.org/geo/1.0/zip?zip=";
    reqUrl += zipcode;
    reqUrl += `&appid=${apiKey}`;

    let lat, lon, name;

    fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            lat = response.lat;
            lon = response.lon;
            name = response.name;
            getWeather(lat, lon);
        })
}

function getWeather(lat, lon) {
    let reqUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            showWeather(response);
        })
}

function showWeather(data) {

}
weatherByZip("05401");

