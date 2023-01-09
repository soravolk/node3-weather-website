// /* request() arguments:
// arg1: URL and other information
// arg2: function to run
// */
// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     console.log(
//       response.body.current.weather_descriptions[0] +
//         `. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out`
//     );
//   }
// });
const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2a028493f452e68a5bc9868a3b291b7b&query=${latitude},${longitude}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect", undefined);
    } else if (body.err) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        weather_descriptions: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
