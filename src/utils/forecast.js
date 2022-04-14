const request = require('request');

function forecast(location, callback){
    const keyWeather = '459edaae4e9242b61dd97fffe2647cfe';
    const url = `http://api.weatherstack.com/current?access_key=${keyWeather}&query=${location}&units=m`;
    request({ url, json: true }, (err, {body} = {}) => {
        if (err) {
            callback('Unable to connect to weather service (weatherstack)!', undefined)
        } else if(body.error){
            callback(body.error.info, undefined)
        } else {
            // console.log(body.current);
            // const {wind_degree, wind_speed, weather_descriptions, weather_icons, temperature, humidity} = body.current;
            // const data = 
            // const msg = `It is currently is wind speed ${wind_speed} and wind degree is ${wind_degree} and propblly is weather will ${weather_descriptions} ${weather_icons} and temperature ${temperature}`;
            callback(undefined, body.current)
        }
    }); 
}

module.exports = forecast;