import { getUnit } from './index.js'

export default function dayForecast(data) {
    let i = 0;
    const showDate = {weekday:'short', month: 'long', day:'numeric'}
    document.querySelectorAll('.day-forecast').forEach(dayDiv => {
        dayDiv.textContent = new Date(data.forecast.forecastday[i].date.replace(/-/g, '\/')).toLocaleDateString("en-US", showDate)
        dayDiv = dayDiv.nextElementSibling
        dayDiv.src = data.forecast.forecastday[i].day.condition.icon;
        dayDiv = dayDiv.nextElementSibling.children[0].children[1];
        (getUnit() !== 'mph-f') ?dayDiv.textContent = Math.round(data.forecast.forecastday[i].day.mintemp_c)
        :dayDiv.textContent = Math.round(data.forecast.forecastday[i].day.mintemp_f);
        dayDiv = dayDiv.parentElement.nextElementSibling.children[1];
        (getUnit() !== 'mph-f') ?dayDiv.textContent = Math.round(data.forecast.forecastday[i].day.maxtemp_c)
        :dayDiv.textContent = Math.round(data.forecast.forecastday[i].day.maxtemp_f);
        i++
    })
}