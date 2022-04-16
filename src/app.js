const path = require('path')
const express = require('express');
const app = express();
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

// Define paths for Express config
const viewPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static directory to serve like link css files and js files
app.use(express.static(publicPath));

// Setup handlbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res)=>{
	res.render('index', {
		headTitle: 'Weather',
		title: 'Weather',
		name: 'Hossein Mozafari',
		team: ['Hossein', 'Hamid', 'Mostafa', 'Hassan'],
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		headTitle: 'About',
		title: 'About Me',
		name: 'Hossein Mozafari',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		headTitle: 'Help',
		title: 'Help',
		name: 'Hossein Mozafari',
	})
})
app.get('/help/*', (req, res) => {
	res.render('404', {
		headTitle: '404',
		title: '404 help',
		name: 'Hossein Mozafari',
		errorMessage: 'Help article not found'
	})
})

app.get('/products', (req, res) => {
	if(!req.query.search) {
		return res.send({
			error: 'You must provide a search term.'
		})
	}
	res.send({
		products: [req.query.search],
	})
})

app.get('/weather', (req, res) => {
	if(!req.query.address) {
		return res.send({
			error: 'You must provide an address',
		});
	}
	let address = req.query.address;
	geoCode(address, (err, {text, place_name, center} = {})=>{
		if(err){
			return res.send({err})
		}

		forecast(text, (errorForecast, dataForcast) => {
			if(errorForecast){
				return res.send({helll: errorForecast})
			}
			res.send({
				'place_name': place_name,
				forecast: dataForcast	
			})
		})
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Hossein Mozafari',
		errorMessage: 'page not Found'
	})
})

app.listen(port, () => {
	console.log('Server is up on port '+ port);
})




































// const publicPath = path.join(__dirname, '../public');
// app.use(express.static(publicPath));

// app.get('', (req, res)=>{
//     // console.log(req);
//     res.render('index')
// })

// app.listen(4000, () => {
//     console.log('Server is up on post 3000')
// })




// app.get('', (req, res) => {
//     res.send('<h1>this is home page</h1>')
// });

// app.get('/help', (req, res) => {
//     res.send({
//         fname: 'Hossein',
//         age: 23
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<div style="width: 100px; height: 100px; background: green">hello how are you playground</div>')
// });

// app.get('/weather', (req, res) => {
//     res.send({
//         location: 'Mashhad',
//         longitude: 23.3234,
//         latitude: 12.903
//     })
// })



		// {wind_degree, wind_speed, weather_descriptions, weather_icons, temperature, observation_time, feelslike. cloudcover, visibility, is_day}
		// address: address,
		// location: text,
		// // forecast: dataForcast,
		// 'place name': place_name,
		// coordinates: center,
		// temperature: temperature,
		// 'wind degree': wind_degree,
		// 'wind speed': wind_speed,
		// 'weather descriptions': weather_descriptions,
		// 'weather icons': weather_icons,
