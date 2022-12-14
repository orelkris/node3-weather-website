const request = require('request');

const geocode = (address, token, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}&limit=1`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
      return;
    }

    if (body.query.length === 0) {
      callback(
        'Unable to find location. Please try another search.',
        undefined
      );
      return;
    }

    if (body.message) {
      callback(body.message, undefined);
      return;
    }

    const data = {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name,
    };

    callback(undefined, data);
  });
};

module.exports = geocode;
