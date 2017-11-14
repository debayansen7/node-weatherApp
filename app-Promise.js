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

// axios.get(geocodeURL).then((response ) => {
//   console.log(response);
// })




//    API key for weather forcast from forecasr.io - 98ae296519a16a250ea4bb4546ab43ac
