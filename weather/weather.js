const request = require('request');

var getWeather = (lat, lng, callback) => {
  var latitude = lat;
  var longitude = lng;
  // console.log(latitude, longitude);
  request({
    url: `https://api.darksky.net/forecast/98ae296519a16a250ea4bb4546ab43ac/${latitude},${longitude}`,
    json: true,
  }, (error, response, body) => {
    if(!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      });
    }
    else {
      callback("Sorry no unable to fetch weather.")
    }
  })
};

module.exports.getWeather = getWeather;
