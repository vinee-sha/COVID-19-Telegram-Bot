const request = require('request');
const getlatlong = require('./getLatLong');

var localHosp = function(latlong, callbackfunc) {
    if(error) {
        callbackfunc(error, null)
    }
    request({ url: link, json: true }, function(error, response) {
        var link = 'https://api.tomtom.com/search/2/categorySearch/hospital.json?countrySet=' + latlong.country + '&lat=' + latlong.latitude + '&lon=' + latlong.longitude + '&key=W6gAYv7w3m2Jz9ZQQcdNsRNB4rUxmt81';
        if (error) {
            callbackfunc(error, null)
        } else if (response.body.message == "Not Found") {
            callbackfunc(error, null)
        }else if (response.body.results.length == 0) {
            callbackfunc(error, null)
        } else {
            var len = response.body.results
            var array = []
            var namearray = []
            for (var i = 0; i < len.length; i++) {
                array.push(len[i].position)
                namearray.push(len[i].poi.name)
            }
            callbackfunc(null, { array: array, namearray: namearray })
        }
    })
}

module.exports.localHosp = localHosp;