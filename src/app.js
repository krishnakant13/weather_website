const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicdir = path.join(__dirname,'../public')
const viewpath = path.join(__dirname, '../templets/views')
const partialspath = path.join(__dirname, '../templets/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs') // (name of setting/property, value to be set)
app.set('views', viewpath)
hbs.registerPartials(partialspath)

//Setup static(for plain html,css,js) dir to serve
app.use(express.static(publicdir))


//Setting up routes

app.get('' , (req,res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'krish'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About',
        name: 'krish'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'krish'
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.location)
    {
        return res.send('Please enter location in query string')
    }

    geocode(req.query.location,(error,{latitude,longitude,location} = {})=>{
        if(error)
        {
            return res.send(error)
        }
        forecast(latitude,longitude, (error, forecast_data) => {
           if(error){
                return res.send('Error', error)
           }

           const data = {
               location : location,
               current_temp: forecast_data.current_temp,
               current_weather:  forecast_data.weather,
               expected_temp: forecast_data.expected_temp
           }
           res.send(data)
    
          })
    })

})

app.get('/products', (req,res) =>{
    if(!req.query.search)
    {
        return res.send('Please enter search query')
    }

    res.send({
        products: []
    })

})

app.get('*', (req,res) =>{
    res.render('404', {
        title: 'From node_help',
        name: 'krish',
        errormsg: 'Page not found'
    })
})

app.listen(port,() => {
    console.log('server is started')
})