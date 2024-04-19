import { DateTime } from 'luxon';
import { getUnit } from './index.js';
let interval;

function currentData(data){ 
    interval = setInterval(() => {
    let currentTime = DateTime.now().setZone(data.location.tz_id);
    document.getElementById('current-time').textContent = 
    (getUnit() == "kph-c") ? currentTime.toFormat('HH:mm:ss') : currentTime.toFormat('tt')
    }, 500);
    document.getElementById('location').textContent = data.location.name
    document.getElementById('current-time').textContent = undefined
    document.getElementById('condition').textContent = data.current.condition.text
    document.getElementById('condition-icon').src = data.current.condition.icon
}

function hourForecast(data) {
    let i = 0;
    let day = 0;
    document.querySelectorAll('.time-forecast').forEach((timeDiv) => {
        let time = data.forecast.forecastday[day].hour[i++].time;
        if(i == 24) {day = 1; i = 0}
        //Get location current time
        const currentTimeInTargetZone = DateTime.now().setZone(data.location.tz_id);
        const formattedTime = currentTimeInTargetZone.toFormat('yyyy-MM-dd HH:mm');
        while(formattedTime > time){
             time = data.forecast.forecastday[day].hour[i++].time;
             if(i == 24) {day = 1; i = 0}
        };
        hourDataForecast(data, timeDiv, i, day);
        if(getUnit() == 'mph-f') {
            timeDiv.textContent = formatTime(new Date(time))
        } else {timeDiv.textContent = formatTime(new Date(time))}
    });
};

function hourDataForecast(data, timeDiv, i, day){
    let nextElement;
    nextElement = timeDiv.nextElementSibling;
    nextElement.src = data.forecast.forecastday[day].hour[i].condition.icon;
    nextElement = nextElement.nextElementSibling;
    nextElement = nextElement.firstElementChild;
    (getUnit() !== 'mph-f') ? nextElement.textContent = Math.round(data.forecast.forecastday[day].hour[i].temp_c) 
    :nextElement.textContent = Math.round(data.forecast.forecastday[day].hour[i].temp_f)
}

function formatTime(date){
    return (getUnit() == "mph-f")? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
   : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

export {currentData, hourForecast, interval}