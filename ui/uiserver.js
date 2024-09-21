const express = require('express');

const app = express();
require('dotenv').config();

app.use(express.static('public'));

const PORT = process.env.UI_PORT || 5500;
const URL_API = process.env.GRAPHQL_URL;
const env = { URL_API };

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.listen(PORT, () => {
  console.log(`UI Server running on ${PORT}`);
});

