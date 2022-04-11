fetch('http://puzzle.mead.io/puzzle').then((res) => {
	res.json().then((data) => {
		console.log(data);
	});
});

const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
	event.preventDefault();
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	fetch(`/weather?address=${searchLocation.value}`).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				console.log(data.forecast);
				console.log(data.location);
				messageOne.textContent = data.location;
				messageTwo.textContent = `Weather description ${data.forecast.weatherDescription}, temperature is at ${data.forecast.temperature} degrees and feels like ${data.forecast.feelsLike} degrees.`;
			}
		});
	});
	document.querySelector('input').value = '';
});
