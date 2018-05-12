const axios = require('axios');

const BASE_URL = 'http://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPENWEATHER_API_KEY;

const weather = async (req, res) => {
  try {
    // We're just acting as a proxy to the OpenWeatherMap API,
    // so we just pass on the full query and tack on our API key,
    // and in return pass along the data from the response we receive
    const response = await axios.get(`${BASE_URL}${req.url}&APPID=${API_KEY}`);
    // TODO: throw an error if one is received from the API request
    res.json(response.data);
  } catch (err) {
    // Log & send back an error if one occurs
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { weather };
