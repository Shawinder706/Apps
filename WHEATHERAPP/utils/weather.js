const request =require('request')
const constants = require('../config')

const weather =(address,callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY
    console.log(url)
    request({url, json:true},(error, {body})=>{
        //console.log(body)
        if(error){
            callback(`can't fetch data from api`,undefined)
        }else{
            callback(undefined,{
                temprature : body.main.temp,
                description: body.weather[0].description,
                cityName:body.name
            })
        }
    })
}

module.exports= weather