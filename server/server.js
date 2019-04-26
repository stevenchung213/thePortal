require('dotenv').config();
const path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  helmet = require('helmet'),
  cors = require('cors'),
  giphy = require('./routes/giphy'),
  port = 3000,
  app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './../dist')));
app.use('/api/giphy', giphy);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + './../dist/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log('Express listening at http://localhost:' + port + '/');
});
