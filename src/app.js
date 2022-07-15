const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forrecast = require('./utils/forrecast');

// console.log(__dirname, '__dirname');
// console.log(__filename, '__filename');
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});

const puplicPath = path.join(__dirname, '../public');

// myaApp.com => root route
// myApp.com/help => /help route
// myApp.com/about => /about route

// 1st argument is route empty strng for root route.
// 2nd argument is a callback with req and res as arguments.
// app.get('', (req, res) => {
// 	// Handling of root route.
// 	// res.send('Hello express!');
// 	res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res) => {
// 	// Handling of /help route.
// 	// res.send('Help page!');
// 	res.send({
// 		name: 'Test',
// 		number: 30,
// 	});
// });

// app.get('/about', (req, res) => {
// 	res.send('<h1>About page!</h1>');
// });

// app.get('/weather', (req, res) => {
// 	res.send('Weather page!');
// });

// express works throught the application until it finds a match for the route.
// Which means the root route won't be used because express will find the index.html which has a special meaning file in the public directory,
// and will use that file for the root path.
// Same for the /help and /about routes and for every page express finds in the pulic folder.
app.use(express.static(puplicPath));

// We set a specific settings in our express instance.
// In this case we set the templating engine we are using.
app.set('view engine', 'hbs');

// We delete the index.html file from public since we are going to serve the index.hbs file.
// This will be a dynamic page. The index.html was a static page

app.get('', (req, res) => {
	// render allows to use one of our views.
	res.render('index', {
		title: 'Weather App',
		name: 'lordofdankness',
	});
});

app.get('/about', (req, res) => {
	// render allows to use one of our views.
	res.render('about', {
		title: 'About page!',
		name: 'lordofdankness',
	});
});

app.get('/help', (req, res) => {
	// render allows to use one of our views.
	res.render('help', {
		title: 'Help page!',
		helpText: 'Some help text.',
		name: 'lordofdankness',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide a search term.',
		});
	}
	geocode(req.query.address, (error, { latitude, longtitude, location } = {} /*This is called ES6: Default function parameters*/) => {
		if (error) {
			return res.send({
				error: error,
			});
		}
		forrecast(latitude, longtitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error: error,
				});
			}
			res.send({
				forecast: forecastData,
				location: location,
				address: req.query.address,
			});
		});
	});
});

// Renamed views directory to templates, now we need to tell express where the views are located.
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPAth = path.join(__dirname, '../templates/partials');

// We tell hbs where to find the partials.
hbs.registerPartials(partialsPAth);

app.set('views', viewsPath);

// This way we can serve custom 404 pages for each path that does not match the url.
// We catch all help 404s in this.
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help Article Not Found',
		name: 'lordofdankness',
	});
});

// This is used when the url provided is not matched by any of the urls listed below.
// The * wildcard character is used for any url not listed, and needs to be at the bottom of every listed url.
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page Not Found',
		name: 'lordofdankness',
	});
});
