const request = require('request');

function api(address, callback){
    const keyMapBox = 'pk.eyJ1IjoiaHVzc2VpbjQzOSIsImEiOiJjbDRpMTFkbjkwYWU3M2pwZmFhY2Z3b3JxIn0.ahOyFCD79cixOBVdumGZ3A';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${keyMapBox}`
    request({ url, json: true }, (err, {body} = {}) => {
        if(err == null || body.message){
            callback('Unable to conncet to weather service (mapbox)!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable tot find location. Try another Search.', undefined);
        } else {
            callback(undefined, body.features[0])
        }
    })
}

module.exports = api;