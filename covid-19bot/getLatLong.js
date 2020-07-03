const request = require('request');

var geoloc = function(townvalue, callbackfunc) {

    var link = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + townvalue + '.json?access_token=pk.eyJ1IjoidmluZWVzaGFuYW1hbmEzMjEiLCJhIjoiY2themYxYTdhMDh6ODJwdGdncGVjNnJiMyJ9.EVfj3HSTzE02to-0UknbGA';

    request({ url: link, json: true }, function(error, response) {
        if (error) {
            callbackfunc(error, null)
        } else if (response.body.length == 0) {
            callbackfunc(error, null)
        } else if (response.body.features.length == 0) {
            callbackfunc(error, null)
        } else {
            var data = response.body.features[0].context
            callbackfunc(null, { latitude: response.body.features[0].center[1], longitude: response.body.features[0].center[0], country: data[data.length - 1].text })
        }
    })
}

module.exports.geoloc = geoloc;