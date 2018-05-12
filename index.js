require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// App setup
const app = express();
// Allow cross-origin requests (temporarily)
app.use(cors());

// set up all the routes
routes(app);

// start listening to incoming requests
app.listen(process.env.PORT, () => {
  console.log('API server running on port', process.env.PORT);
});
