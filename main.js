const appid = 'b3978073fde497af532c970fab90ccc0' 
// my appid
const button = document.getElementById('button') 
// submit button
const inputElement = document.getElementById('input') 
// input element where the name of city is written 
let city = ''
button.addEventListener('click', e=> {
    // infElement.innerHTML = '' // refresh infElement every time you click on button
    city = inputElement.value // setting city variable
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`)
    // with fetch function you request information from the API; if you want to get specific data, you need to pass variables (in this case it is CITY and APIID)
        .then(res => { // function fetch takes some time to load data from API. Thats why call .then() in order to get data first and work with data after that
            const previousElement = document.getElementsByClassName('information')[0]
            if (previousElement!=null) document.body.removeChild(previousElement)
            const infElement = document.createElement('div')
            infElement.className = 'information'
            if (res.ok) res.json() // it returns some object, but we need to turn that data to JSON format (Javascrips's format)
                .then(doc => { //function .json() also takes some time, so call .then() after it
                    // make changes to the page in this section
                    // simply create HTML element
                    // then edit it: add class; value from API
                    // finally make it infElement's child
                    // for example:
                    
                    // by the way infElement is main element on the page where you put another elements with information in it

                    const current = document.createElement('div')
                    current.className = 'informationElement informationTitle'
                    current.innerHTML = 'Current Weather in ' + doc.name
                    infElement.appendChild(current)

                    const weather = document.createElement('div')
                    weather.className = 'informationElement'
                    weather.innerHTML = doc.weather[0].main
                    infElement.appendChild(weather)

                    const temp = document.createElement('div')
                    temp.className = 'informationElement'
                    temp.innerHTML = 'Temperature ' + (doc.main.temp) +'°C' 
                    infElement.appendChild(temp)

                    const tempFeel = document.createElement('div')
                    tempFeel.className = 'informationElement'
                    tempFeel.innerHTML = 'Feels like ' + (doc.main.feels_like) +'°C' 
                    infElement.appendChild(tempFeel)

                    const humidity = document.createElement('div')
                    humidity.className = 'informationElement'
                    humidity.innerHTML = 'Humidity ' + (doc.main.humidity) + '%'
                    infElement.appendChild(humidity)

                    const pressure = document.createElement('div')
                    pressure.className = 'informationElement'
                    pressure.innerHTML = 'Pressure ' + (doc.main.pressure) + 'Pa'
                    infElement.appendChild(pressure)

                    const wind = document.createElement('div')
                    wind.className = 'informationElement'
                    wind.innerHTML = 'Wind ' + (doc.wind.speed) + 'm/s'
                    infElement.appendChild(wind)

                    const visibility = document.createElement('div')
                    visibility.className = 'informationElement'
                    visibility.innerHTML = 'Visibility ' + (doc.visibility)/100+'%'
                    infElement.appendChild(visibility)

                    document.body.appendChild(infElement)
                })
                else {
                    // if there is no city with such name, simply do this
                    const element = document.createElement('div')
                    element.innerHTML = 'There is no city with such name in the API'
                    element.className = 'error'
                    infElement.appendChild(element)
                    console.log('Error: there is no city with such name in the API')
                    document.body.appendChild(infElement)
                }
        })
        .catch(err => console.error(err)) // if there is an error with fetch function, then print that error
})
