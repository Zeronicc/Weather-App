let data;
let timeElement = '00:00';
let units = 'kph-c';

window.onload = (e => {
    document.querySelector('.loading-icon').classList.toggle('toggle')
    getData('new york')
});

document.getElementById('submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    getData(document.getElementById('search').value);
});

document.getElementById('unit-change').addEventListener('click', e => {
    e.preventDefault();
    units == 'mph-f' ? units = 'kph-c' : units = 'mph-f'
    console.log(data)
    setUnits(data)
});


async function getData(location){
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d884941f7f8e4303bfe14000241903&q=${location}&days=3&aqi=no&alerts=no`)
        data =  await response.json()
        logData(data)
        loading()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}


function loading(){
    document.querySelector('.info-container').classList.toggle('toggle');
    document.querySelector('.loading-icon').classList.toggle('toggle')
}

function logData(data){ 
    currentData(data)
    setUnits(data)
}

function currentData(data){
    document.getElementById('location').textContent = data.location.name
    document.getElementById('last-updated').textContent = data.current.last_updated
    document.getElementById('condition').textContent = data.current.condition.text
    document.getElementById('condition-icon').src = data.current.condition.icon
}

function hourForecast(data) {
    currentForecast(data);
};

function setUnits(data){
    if(units == 'mph-f'){
        document.getElementById('temperature').textContent = data.current.temp_f
        document.getElementById('wind').textContent = data.current.wind_mph
        document.getElementById('wind-unit').textContent = 'MPH'
        document.getElementById('temp-icon').src = 'img/fahrenheit.png'
        hourForecast(data);


    }else {
        document.getElementById('temperature').textContent = data.current.temp_c
        document.getElementById('wind').textContent = data.current.wind_kph
        document.getElementById('wind-unit').textContent = 'KPH'
        document.getElementById('temp-icon').src = 'img/celsius.png'
        hourForecast(data);
    }


}

function formatTime(date){
    hour = (date.getHours()<10?'0':'') + date.getHours();
    minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
    return hour + ':' + minutes
}

function currentForecast(data){
    let i = 0;
    document.querySelectorAll('.time-forecast').forEach((timeDiv) => {
        
        timeElement = formatTime(new Date(data.forecast.forecastday[0].hour[i++].time));
        for(i; formatTime(new Date()) > timeElement; i++){
          
            timeElement = data.forecast.forecastday[0].hour[i].time
            timeElement = new Date(timeElement)
            timeElement = formatTime(timeElement)
            console.log(timeElement)
        };
        //Same code inside the loop
        dataForecast(data, timeDiv, i);
        if(units == 'mph-f') {
            timeElement = new Date(`July 17, ${parseFloat(timeElement)}:00`).toLocaleTimeString()
            timeElement = timeElement.replace('00:', '')
        };
        timeDiv.textContent = timeElement;
});
};

function dataForecast(data, timeDiv, i){
    nextElement = timeDiv.nextElementSibling;
    nextElement.src = data.forecast.forecastday[0].hour[i].condition.icon;
    console.log(i)
    nextElement = nextElement.nextElementSibling;
    nextElement = nextElement.firstElementChild;
    (units !== 'mph-f') ? nextElement.textContent = data.forecast.forecastday[0].hour[i].temp_c :nextElement.textContent = data.forecast.forecastday[0].hour[i].temp_f
  //  console.log(nextElement)

}

