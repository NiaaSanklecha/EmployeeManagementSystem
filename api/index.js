const express = require("express");
require('dotenv').config();
const app = express();
const { installHandler } = require('./api_handler');
const { connectToDB } = require('./db');

const PORT = 4000;

installHandler(app);

(async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`API Server running on ${PORT}`);
    });
  } catch (error) {
    console.log('ERROR:', error);
  }
})();
