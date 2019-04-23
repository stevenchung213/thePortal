require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const request = require('request');

const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + './../dist/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.post('/giphy', (req, res) => {
  const query = req.body.query.split(' ').join('+');
  request.get(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${process.env.GIPHY_API_KEY}&limit=5`, (err, resp, body) => {
    res.status(200).send(JSON.parse(body));
  });
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log('Express listening at http://localhost:' + port + '/');
});
