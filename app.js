const result = document.querySelector('.result')
const form = document.querySelector('.get-weather')
const namesCitys = document.querySelector('#city')
const nameCountry = document.querySelector('#country')

form.addEventListener('submit' , (e) => {
    e.preventDefault();
    //Validamos si esta vacio
    if(namesCitys.value === '' || nameCountry.value === ''){
        showError('Ambos Campos estan vacios')
    }

    callAPI(namesCitys.value,nameCountry.value)
})

async function callAPI(city,country){
    const apiID = 'c987def1583e9f2450a077aa90bc482c'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiID}`
    //https ://api.openweathermap.org/data/2.5/weather?q=bogota,colombia&appid=c987def1583e9f2450a077aa90bc482c
    fetch(url)
    .then(res => {
        return res.json()
    })
    .then(data => {
        if(data.cod === '400'){
            showError('Ciudad no encontrada')
        }else{
            clearHTML()
            showWeather(data)
        }
    })
    .catch(error => {
        console.log(error)
    })
}

//Mostramos la información
function showWeather(data){
    const {name,main:{temp,temp_min,temp_max},weather:[arr]} = data
    const degrees = converCentigrados(temp)
    const degressMin = converCentigrados(temp_min)
    const degressMax = converCentigrados(temp_max)

    const content = document.createElement('div')
    content.innerHTML = `
    <h5>Clima en ${name}</h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
    <h2>${degrees}</h2>
    <p>Max: ${degressMin}</p>
    <p>Min: ${degressMax}</p>
    `

    result.appendChild(content)
}

//Manejo de errors
function showError(message){
    console.log(message)
    const alert = document.createElement('p')
    alert.classList.add('alert-message')
    alert.innerHTML = message

    form.appendChild(alert)

    setTimeout(() => {
        alert.remove();
    },3000);
}

//Limpiador de html
function clearHTML(){
    result.innerHTML = ''
}

//Convertir a centigrados
function converCentigrados(temp){
    return parseInt(temp - 273.15)
}