import './style.css';
import celsiusDegree from '/dist/img/celsius.png';
import fahrenheitDegree from '/dist/img/fahrenheit.png'
import {currentData, hourForecast, interval} from './current.js'
import dayForecast from './week.js'

let data;
let units = 'kph-c';

window.onload = (e => {
    document.querySelector('.loading-icon').classList.toggle('toggle')
    getData('los angeles')
});

document.getElementById('submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    getData(document.getElementById('search').value);
    loading();
});

document.getElementById('unit-change').addEventListener('click', e => {
    e.preventDefault();
    units == 'mph-f' ? units = 'kph-c' : units = 'mph-f'
    setUnits(data)
});

async function getData(location){
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d884941f7f8e4303bfe14000241903&q=${location}&days=3&aqi=no&alerts=no`)
        if(!response.ok) throw new Error('Could not obtain Data.')
        data =  await response.json()
        logData(data)
        loading()
        return data
    } catch (error) {
        loading();
        return console.log(error)
    }
}

function loading(){
    document.querySelector('.info-container').classList.toggle('toggle');
    document.querySelector('.loading-icon').classList.toggle('toggle')
}

function logData(data){ 
     if (interval !== undefined) clearInterval(interval)
    currentData(data)
    setUnits(data)
}

function setUnits(data){
    if(units == 'mph-f'){
        document.getElementById('temperature').textContent = Math.round(data.current.temp_f)
        document.getElementById('wind').textContent = Math.round(data.current.wind_mph)
        document.getElementById('wind-unit').textContent = 'MPH'
        document.getElementById('temp-icon').src = fahrenheitDegree
        hourForecast(data);
        dayForecast(data)
    }else {
        document.getElementById('temperature').textContent = Math.round(data.current.temp_c)
        document.getElementById('wind').textContent = Math.round(data.current.wind_kph)
        document.getElementById('wind-unit').textContent = 'KPH' 
        document.getElementById('temp-icon').src = celsiusDegree
        hourForecast(data);
        dayForecast(data)
    }
}

function getUnit(){
    return units
}

export {getUnit}
