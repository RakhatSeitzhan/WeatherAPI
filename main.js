const appid = 'b3978073fde497af532c970fab90ccc0' 
const button = document.getElementById('button') 
const inputElement = document.getElementById('input') 

function main(){
    const city = inputElement.value
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`)
    .then(currentRaw => { 
        if (currentRaw.ok) {
            currentRaw.json()
            .then(current => {
                document.getElementsByClassName('current-and-daily')[0].style.animation = 'appear forwards 0.5s'
                hideFailElement()
                setCurrentWeather(current)
                setDailyWeather(current.coord.lat, current.coord.lon)
            })
        } else {
            showFailElement()
        }
    })
    .catch(err => console.error(err))
}

function showFailElement(){
    document.getElementById('fail').style.display = 'inline'
}
function hideFailElement(){
    document.getElementById('fail').style.display = 'none'
}

function setCurrentWeather(current){
    document.getElementById('current-title').innerHTML = 'Current Weather in '+current.name
    document.getElementById('current-temp').innerHTML = Math.round(current.main.temp) +'°C'
    document.getElementById('current-temp-img').src = `/OpenWeatherMap/${current.weather[0].id}.svg`
    document.getElementById('feels').innerHTML = current.main.feels_like + '°C'
    document.getElementById('sunrise').innerHTML = new Date(current.sys.sunrise*1000).toTimeString().substring(0,5)
    document.getElementById('sunset').innerHTML = new Date(current.sys.sunset*1000).toTimeString().substring(0,5)
    document.getElementById('wind').innerHTML = current.wind.speed + 'm/s'
    document.getElementById('humidity').innerHTML = current.main.humidity + '%'
    document.getElementById('visibility').innerHTML = current.visibility /100 + '%'
    document.getElementById('pressure').innerHTML = current.main.pressure + 'kPa'
} 

function setDailyWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,
    minutely,hourly&appid=${appid}&units=metric`)
        .then(dailyRaw => { 
            if (dailyRaw.ok) 
                dailyRaw.json() 
                .then(info => {
                    hideFailElement()
                    var d = new Date()
                    var w = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                    const nameElements = document.getElementsByClassName('day-name')
                    const iconElements = document.getElementsByClassName('day-icon')
                    const maxElements = document.getElementsByClassName('day-max')
                    const minElements = document.getElementsByClassName('day-min')
                    for (var i = 0; i < 7; i++){
                        nameElements[i].innerHTML = w[(d.getDay()+i)%7]
                        iconElements[i].src = `http://openweathermap.org/img/wn/${info.daily[i].weather[0].icon}@2x.png`
                        maxElements[i].innerHTML = Math.round(info.daily[i].temp.day)
                        minElements[i].innerHTML = Math.round(info.daily[i].temp.night)
                    }

                })
            else {
                showFailElement()
            }
        })
        .catch(err => console.error(err)) // fetching went wrong
}

button.addEventListener('click', e=> main())
