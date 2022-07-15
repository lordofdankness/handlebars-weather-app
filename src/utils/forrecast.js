const request = require('postman-request');
require('dotenv').config();

const weatherStackApiKey = process.env['weatherStackApiKey'];

const forrecast = async (latitude, longitude, callback) => {
	const weatherStackURL = `http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${latitude},${longitude}&units=m`;
	request({ url: weatherStackURL, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to weather services.', undefined);
		} else if (body.error) {
			callback('Unable to find location.', undefined);
		} else {
			callback(undefined, {
				weatherDescription: body.current.weather_descriptions[0],
				temperature: body.current.temperature,
				feelsLike: body.current.feelslike,
			});
		}
	});
};

module.exports = forrecast;
