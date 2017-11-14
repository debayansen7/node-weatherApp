const yargs = require('yargs');
const axios = require('axios');

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

var encodeAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(geocodeURL).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error("Unable to find that address..");
  }
  console.log(response.data.results[0].formatted_address);
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherURL = `https://api.darksky.net/forecast/98ae296519a16a250ea4bb4546ab43ac/${lat},${lng}`
  return axios.get(weatherURL);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It is ${temperature}, but feels like ${apparentTemperature}`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
    console.log("Unable to connect to api server!!!");
  }else{
    console.log(e.message);
  }
})

//    API key for weather forcast from forecasr.io - 98ae296519a16a250ea4bb4546ab43ac
