const apiKey = "a8399274d821a66647513527414df9b0";

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

            if (lat && lon) {
                document.querySelector('.current-weather h2').innerHTML = `Current Weather in ${name}`;
                getCurrentWeather(lat, lon);
            } else {
                document.querySelector('.current-weather h2').innerHTML = `Bad Zip`;
            }
            
            

        })
}

function getCurrentWeather(lat, lon) {

    let reqUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            showCurrentWeather(response);
            showForecast(response);
        })
}

function showCurrentWeather(data) {
    const temp = data.current.temp;
    const tempMax = data.daily[0].temp.max;
    const tempMin = data.daily[0].temp.min;
    const humidity = data.current.humidity;
    const pressure = data.current.pressure;
    const sunrise = data.current.sunrise;
    const sunset = data.current.sunset;
    const windspeed = data.current.wind_speed;
    const windDir = data.current.wind_deg;
    const description = data.current.weather[0].description;
    const icon = data.current.weather[0].icon;
    const iconDesc = data.current.weather[0].main;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    const tempF = ((temp - 273.15) * 9/5 + 32).toFixed(0);
    const tempMaxF = ((tempMax - 273.15) * 9/5 + 32).toFixed(0);
    const tempMinF = ((tempMin - 273.15) * 9/5 + 32).toFixed(0);

    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);
   
    const windspeedImp = (windspeed * 2.237).toFixed(1);

    document.querySelector('.current-weather .inner-weather .temperature .current').innerHTML = `${tempF}&deg;`;
    document.querySelector('.current-weather .inner-weather .temperature .max .data').innerHTML = `${tempMaxF}&deg;`;
    document.querySelector('.current-weather .inner-weather .temperature .min .data').innerHTML = `${tempMinF}&deg;`;
    document.querySelector('.current-weather .winds .indicator').setAttribute('style', `--wind-dir: ${windDir}deg`);
    document.querySelector('.current-weather .winds .wind-dir').innerHTML = `${windDir}&deg;`;
    document.querySelector('.current-weather .winds .wind-speed').innerHTML = `${windspeedImp} mph`;
    document.querySelector('.current-weather .inner-weather .humidity .data').innerHTML = `${humidity}%`;
    document.querySelector('.current-weather .inner-weather .pressure .data').innerHTML = `${pressure} kPa`;
    document.querySelector('.current-weather .inner-weather img.icon').setAttribute('src', iconUrl);
    document.querySelector('.current-weather .inner-weather .condition').innerHTML = description;



    document.querySelector('.current-weather .sunrise .time').innerHTML = sunriseDate.getHours().toString().padStart(2, '0') + ':' + sunriseDate.getMinutes().toString().padStart(2, '0');
    document.querySelector('.current-weather .sunset .time').innerHTML = sunsetDate.getHours().toString().padStart(2, '0') + ':' + sunsetDate.getMinutes().toString().padStart(2, '0');

}

function showForecast(data) {
    document.querySelector(".days").textContent = "";

    const days = data.daily.slice(1,6);

    days.forEach(function(day, index) {
        // console.log(day);

        const newDay = document.createElement("div");
        newDay.classList.add(`day-${index}`);

        const dt = day.dt;
        const icon = day.weather[0].icon;
        const desc = day.weather[0].description;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        const maxT = day.temp.max;
        const minT = day.temp.min;
        const maxTF = ((maxT - 273.15) * 9/5 + 32).toFixed(0);
        const minTF = ((minT - 273.15) * 9/5 + 32).toFixed(0);

        const date = new Date(dt * 1000);
        let dayname;
        switch (date.getDay()) {
            case 0 : 
                dayname = 'Sunday';
                break;
            case 1 :
                dayname = 'Monday';
                break;
            case 2 :
                dayname = 'Tuesday';
                break;
            case 3 :
                dayname = 'Wednesday';
                break;
            case 4 : 
                dayname = 'Thursday';
                break;
            case 5 :
                dayname = 'Friday';
                break;
            case 6 :
                dayname = 'Saturday';
                break;
        }

        const daynameContainer = document.createElement('span');
        daynameContainer.classList.add('dayname');
        daynameContainer.innerHTML = dayname;

        newDay.append(daynameContainer);
        const iconDiv = document.createElement("div");
        iconDiv.classList.add('icon');
        const iconImg = document.createElement("img");
        iconImg.setAttribute('src', iconUrl);
        iconImg.setAttribute('alt', desc);
        iconDiv.append(iconImg);

        newDay.append(iconDiv);

        const tempsEl = document.createElement("div");
        tempsEl.classList.add('temps');
        const minTEl = document.createElement('span');
        minTEl.innerText = minTF;
        const maxTEl = document.createElement("div");
        maxTEl.innerText = maxTF;
        tempsEl.append(minTEl);
        tempsEl.append(maxTEl);

        newDay.append(tempsEl);


        document.querySelector(".days").append(newDay);



    })

}

// weatherByZip("05401");

document.querySelector('#zipsearchbutton').addEventListener('click', function() {
    const zip = document.querySelector('#zipsearchfield').value;
    if (zip.length >= 5) {
        weatherByZip(zip);
    }
})

document.querySelector('#zipsearchfield').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.value.length >= 5) {
        weatherByZip(e.target.value);
    }
})
