const request = require('request');

function forecast(location, callback){
    // 459edaae4e9242b61dd97fffe2647cfe
    // mozafarihossein439
    // const keyWeather = '84a842534bcb49e934d6e0065e6f7d07';
    // husseinmozafari979
    const keyWeather = '7b4c72c0c452390edff5b5f44a8136cb';

    const url = `http://api.weatherstack.com/current?access_key=${keyWeather}&query=${location}&units=m`;
    request({ url, json: true }, (err, {body} = {}) => {
        if (err) {
            callback('Unable to connect to weather service (weatherstack)!', undefined)
        } else if(body.error){
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current)
        }
    }); 
}

module.exports = forecast;