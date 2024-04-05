let data;

window.onload = (e => {
    getData('new york')
});

document.getElementById('submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    getData(document.getElementById('search').value);
    units = document.getElementById('units').value
});

document.getElementById('unit-change').addEventListener('click', e => {
    e.preventDefault();
    units(data)
});


async function getData(location){
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=d884941f7f8e4303bfe14000241903&q=${location}`)
        let data =  await response.json()
        logData(data)
        return data
    } catch (error) {
        console.log(error)
    }
}


function logData(data){
    console.log(data)
    currentData(data)

}


function currentData(data){
    units(data);

    document.getElementById('location').textContent = data.location.name
    document.getElementById('last-updated').textContent = data.current.last_updated
    document.getElementById('condition').textContent = data.current.condition.text
    document.getElementById('condition-icon').src = data.current.condition.icon
}

function units(data){
    if(units == 'mph-f'){
        document.getElementById('temperature').textContent = data.current.temp_f
        document.getElementById('wind').textContent = data.current.wind_mph
        document.getElementById('temp-icon').src = 'img/fahrenheit.png'

    }else {
        document.getElementById('temperature').textContent = data.current.temp_c
        document.getElementById('wind').textContent = data.current.wind_kph
        document.getElementById('temp-icon').src = 'img/celsius.png'
    }
}