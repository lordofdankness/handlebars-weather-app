const request = require('postman-request');
const apiKeys = require('./keys');

const geocode = async (address, callback) => {
	const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKeys.mapboxApiKey}&limit=1`;
	request({ url: mapboxURL, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to location services.', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longtitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
