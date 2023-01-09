// const geocodeURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic29yYXZvbGsiLCJhIjoiY2xjYm45dXczMDI3MDN2bmVsMmh3cWJvMiJ9.fYnwZ27VZVrbkYZE5dIMfA&limit=1";

// request({ url: geocodeURL, json: true }, (err, res) => {
//   if (err) {
//     console.log("Unable to connect");
//   } else if (res.body.features.length === 0) {
//     console.log("no matching results");
//   } else {
//     const loc = res.body.features[0].center;
//     console.log(`[longitude: ${loc[0]}, latitude: ${loc[1]}]`);
//   }
// });

const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic29yYXZvbGsiLCJhIjoiY2xjYm45dXczMDI3MDN2bmVsMmh3cWJvMiJ9.fYnwZ27VZVrbkYZE5dIMfA&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect", undefined);
    } else if (body.features.length === 0) {
      callback("no matching results", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
