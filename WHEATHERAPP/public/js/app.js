var fetchweather='/weather'
const weatherForm   =   document.querySelector('form')
const search        =   document.querySelector('input')

const weatherIcon       =   document.querySelector('.weatherIcon i');
const weatherCondition  =   document.querySelector('.weatherCondition')      
const tempElement       =   document.querySelector('.temperature span')
const locationElement   =   document.querySelector('.place')

const dateElement       =   document.querySelector('.date')

const monthNames        =   ['Jan','Feb','mar','april','may','june','july','Aug','Sep','Oct','Nov','Dec']

dateElement.textContent =   new Date().getDate()+", "+ monthNames[new Date().getMonth()].substr(0,3)

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    locationElement.textContent =   "Loading...."
    tempElement.textContent     =   " "
    weatherCondition.textContent=   " "
    const locationApi   =   fetchweather +'?address='+search.value
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error){
                
                locationElement.textContent =   data.error
                tempElement.textContent     =   " "
                weatherCondition.textContent=   " "

            }else{
                locationElement.textContent =   data.cityName
                tempElement.textContent     =   (data.temprature-273.5).toFixed(2) + String.fromCharCode(176)
                weatherCondition.textContent=   data.description.toUpperCase();
                
            }
        })
    })
})