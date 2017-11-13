const request = require('request');

var geocodeaddress = (address, callback) => {
  var encodeAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
    json: true,
  }, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    if(error){
      callback("Unable to connect to Google services.")
    }
    else if(body.status === "ZERO_RESULTS"){
      callback("Sorry no results found against this address.")
    }else if(body.status === 'OK'){

      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
      // const data = body;
      // const dataResults = data.results;
      // const dataGeometry = data.results[0].geometry;
      // const lat = dataGeometry.location.lat;
      // console.log("Lat: ",lat);
      // const lng = dataGeometry.location.lng;
      // console.log("Lng: ",lng);
    }
  })
};

module.exports.geocodeaddress = geocodeaddress;
