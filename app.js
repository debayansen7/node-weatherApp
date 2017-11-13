const yargs = require('yargs');

var geocode = require('./geocode/geocode');
var weather = require('./weather/weather');

const argv = yargs.options({
                  a:{
                    demand: true,
                    alias: 'address',
                    description: "Users address",
                    string: true
                  }
                })
                .help()
                .alias('help','h')
                .argv;

geocode.geocodeaddress(argv.address, (errMessage, results) => {
  if(errMessage){
    console.log(errMessage);
  }
  else{
    console.log(JSON.stringify(results.address, undefined, 2));
    weather.getWeather(results.latitude, results.longitude, (errMessage, weatherResults) => {
      if(errMessage){
        console.log(errMessage);
      }
      else{
        console.log(`It is ${weatherResults.temperature}, but feels like ${weatherResults.apparentTemperature}`);
        // console.log(JSON.stringify(weatherResults, undefined, 2));
      }
    });
  }

});

//    API key for weather forcast from forecasr.io - 98ae296519a16a250ea4bb4546ab43ac
