const request = require('request');

var covidcases = function(country, callbackfunc) {
    var link = 'https://api.covid19api.com/total/country/' + country;

    request({ url: link, json: true }, function(error, response) {
        var dateslen = response.body.length
        if (error) {
            callbackfunc(error, null)
        } else if (dateslen == 0) {
            callbackfunc(error, null)
        } else {
            var data = response.body[dateslen - 1]

            callbackfunc(null, { confirmed: data.Confirmed, deaths: data.Deaths, recovered: data.Recovered, active: data.Active })
        }
    })
}

module.exports.covidcases = covidcases;