const request = require('request');

const forecast = (latitude, longitude, key, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to the weather API.', undefined);
      return;
    }

    if (!body.request) {
      callback(`${body.error.code}: ${body.error.type}`, undefined);
      return;
    }

    const description = body.current.weather_descriptions[0];
    const temperature = body.current.temperature;
    const feelslike = body.current.feelslike;
    const precip = body.current.precip;
    const location = body.location.name;

    const data = {
      location,
      description,
      temperature,
      feelslike,
      precip,
    };

    callback(undefined, data);
  });
};

module.exports = forecast;
