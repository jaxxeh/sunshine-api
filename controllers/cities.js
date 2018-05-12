const axios = require('axios');

const BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const AUTOCOMPLETE = '/autocomplete/json?types=(cities)&key=';
const DETAILS = '/details/json?key=';
const NEARBY = '/nearbysearch/json?type=locality&radius=10000&key=';
const PHOTO = '/photo?key=';

const API_KEY = process.env.GOOGLE_API_KEY;

const format = desc => {
  let matches;
  if ((matches = desc.match(/^(.+?), ([A-Z]{2}), USA$/))) {
    return `${matches[1]}, ${matches[2]}`;
  } else if ((matches = desc.match(/^(.+?), .+?, ([A-Za-z]+?)$/))) {
    return `${matches[1]}, ${matches[2]}`;
  } else {
    return desc;
  }
};

const search = async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${AUTOCOMPLETE}${API_KEY}&input=${req.query.q}`,
    );
    const cities = response.data.predictions.map(p => {
      return {
        name: format(p.description),
        placeId: p.place_id,
      };
    });
    res.json(cities);
  } catch (err) {
    // Log & send back an error if one occurs
    console.log(err.data);
    res.status(500).json(err.data);
  }
};

const details = async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${DETAILS}${API_KEY}&placeid=${req.query.q}`,
    );
    res.json({
      loc: response.data.result.geometry.location,
      photos: response.data.result.photos,
      utcOffset: response.data.result.utc_offset,
    });
  } catch (err) {
    // Log & send back an error if one occurs
    console.log(err.data);
    res.status(500).json(err.data);
  }
};

const find = async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${NEARBY}${API_KEY}&location=${req.query.q}`,
    );
    if (response.data.status !== 'OK') {
      res.json({ error: response.data.status });
    } else {
      res.json({
        id: response.data.results[0].place_id,
        name: response.data.results[0].vicinity,
      });
    }
  } catch (err) {
    // Log & send back an error if one occurs
    console.log(err.data);
    res.status(500).json(err.data);
  }
};

const photo = async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${PHOTO}${API_KEY}&maxwidth=${req.query.w}&photoreference=${
        req.query.q
      }`,
    );
    res.json({ imgUrl: response.request.res.responseUrl });
  } catch (err) {
    // Log & send back an error if one occurs
    console.log(err.data);
    res.status(500).json(err.data);
  }
};

module.exports = { search, details, find, photo };
