const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=6d65a7b0cd3374e2747c0cf8e6ce1158&query=37.8267,-122.4233&units=f'

// request({url:url, json : true}, (error,response)=>{
//     if(error){
//         console.log('No internet connectivity')
//     } else if(response.body.error){
//         console.log('Unable to find location')
//     }
//     else {
//         console.log('Current temp is: '+response.body.current.temperature+' but it feels like: '+response.body.current.feelslike)
//     }
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6d65a7b0cd3374e2747c0cf8e6ce1158&query='+latitude+','+longitude+'&units=f'
    request({url , json : true}, (error, response) => {
        if(error){
            callback('No internet connectivity', undefined)
        } else if(response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = {
                current_temp : response.body.current.temperature,
                expected_temp : response.body.current.feelslike,
                weather : response.body.current.weather_descriptions
            }
            callback(undefined, data)
        }

    })
}

module.exports = forecast