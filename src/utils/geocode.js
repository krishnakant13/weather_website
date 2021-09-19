const request = require('request')

// const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia3Jpc2gxMyIsImEiOiJja3RsYnp5MnExdTRkMm9wZXo4MHBmZHBuIn0.Y1ETq1Nt1GoKwKOeYg2bSg&limit=1'
// request({url:url2, json : true}, (error,response)=>{

//     if(error){
//        // console.log('No internet connectivity')
//     } else if(response.body.features.length === 0){
//         console.log('Unable to find location')
//     }
//     else{
//        // console.log(response.body.features[0])
//     console.log('Latitude of LA: ' + response.body.features[0].center[1]+'. Longitude of LA: '+response.body.features[0].center[0])
//     }
// })



const geocode = (address, callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia3Jpc2gxMyIsImEiOiJja3RsYnp5MnExdTRkMm9wZXo4MHBmZHBuIn0.Y1ETq1Nt1GoKwKOeYg2bSg&limit=1'
    request({ url , json: true}, (error, response) => {
        if(error) {
            callback('No internet connectivity', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const data = {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}



module.exports = geocode