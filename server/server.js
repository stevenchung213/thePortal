const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = 3001;

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
  }
);

// app.post('/login', passport.authenticate('local', (req, res) => {
//     console.log('authentication successful for user: ', req.user);
//     res.redirect('/users/' + req.user.username);
//   })
// );

// app.get('/login', passport.authenticate('oauth2', { successRedirect: '/'})
// );


app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log('Express listening at http://localhost:' + port + '/');
});
