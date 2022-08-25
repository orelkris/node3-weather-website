const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require(path.join(__dirname, '/utils/geocode'));
const forecast = require(path.join(__dirname, '/utils/forecast'));

const key = '532ed4bb9b2a154b2c7938240b7c74ac';
let city = 'mississauga';
const mapboxToken =
  'pk.eyJ1Ijoib3JlbGtyaXMiLCJhIjoiY2w2d2YwNjI5MmRyNTNlbnpycml3YmdoYSJ9._SWs9ylVbgt7XVQ6w51rJw';

const app = express();

// Define paths for Express Config
const publicDirPath = path.join(__dirname, '..', '/public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Kris Orel',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Kris Orel',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Kris Orel',
    message:
      'This is a help page where you can browse for further information about this application.',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must include an address query string',
    });
  }

  const address = req.query.address;
  geocode(
    address,
    mapboxToken,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(
        latitude,
        longitude,
        key,
        (error, { temperature, feelslike, precip }) => {
          if (error) {
            return res.send({
              error,
            });
          }

          res.send({
            location,
            address,
            temperature,
            feelslike,
            precip,
          });
        }
      );
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    errorMessage: 'Help article not found',
    title: 404,
    name: 'Kris Orel',
  });
});

// this needs to come last
app.get('*', (req, res) => {
  res.render('error', {
    errorMessage: 'Page not found',
    title: 404,
    name: 'Kris Orel',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
