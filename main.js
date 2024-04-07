let data;
let units = 'mph-f';
return
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
    hourForecast(data)
}

function currentData(data){
    setUnits(data);
    document.getElementById('location').textContent = data.location.name
    document.getElementById('last-updated').textContent = data.current.last_updated
    document.getElementById('condition').textContent = data.current.condition.text
    document.getElementById('condition-icon').src = data.current.condition.icon
}

function hourForecast(data) {
    document.getElementById('')
}

function setUnits(data){
    if(units == 'mph-f'){
        document.getElementById('temperature').textContent = data.current.temp_f
        document.getElementById('wind').textContent = data.current.wind_mph
        document.getElementById('wind-unit').textContent = 'MPH'
        document.getElementById('temp-icon').src = 'img/fahrenheit.png'

    }else {
        document.getElementById('temperature').textContent = data.current.temp_c
        document.getElementById('wind').textContent = data.current.wind_kph
        document.getElementById('wind-unit').textContent = 'KPH'
        document.getElementById('temp-icon').src = 'img/celsius.png'
    }
}