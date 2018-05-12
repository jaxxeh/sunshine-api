const openWeatherMap = require('./controllers/openWeatherMap');
const cities = require('./controllers/cities');

module.exports = app => {
  // City query for autocomplete
  app.get('/cities/search', cities.search);
  // Retrieve city details given a place ID
  app.get('/cities/details', cities.details);
  // Find a city given coords (lat, lng)
  app.get('/cities/find', cities.find);
  // Retrieve a photo, given a reference and a max width
  app.get('/cities/photo', cities.photo);
  // OpenWeatherMap proxy route for current weather data, given coords
  app.get('/weather', openWeatherMap.weather);
};
