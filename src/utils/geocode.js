const request = require('request');

function api(address, callback){
    const keyMapBox = 'pk.eyJ1IjoiaHVzc2VpbjQzOSIsImEiOiJjbDFtNTU4ZHgwZ3B2M2JvM25ubTcxdm4yIn0.dgOtw9hgOlLtcZfBe-hytQ';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${keyMapBox}`
    request({ url, json: true }, (err, {body}) => {
        if(err){
            callback('Unable to conncet to weather service (mapbox)!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable tot find location. Try another Search.', undefined);
        } else {
            callback(undefined, body.features[0])
        }
    })
}

module.exports = api;