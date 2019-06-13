const express = require('express'),
  router = express.Router(),
  request = require('request'),
  Users = require('../../database/index');

router.use((req, res, next) => {
  console.log(`incoming ${req.method} request to /api/giphy`);
  next();
});

router.get('/:user', (req, res) => {
  console.log('get request\n', req.params)
  const { user } = req.params;
  Users.find({ user: user }).exec()
    .then(resp => res.send(resp[0].giphys))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  console.log('post query\n', req.body)
  const query = req.body.query.split(' ').join('+');
  request.get(`http://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${query}`, (err, resp, body) => {
    if (err) {
      console.log('Error in /giphy POST \n', err)
    }
    res.status(200).send(JSON.parse(body));
  });
});

router.post('/:user', (req, res) => {
  console.log('post save\n', req.body)
  const { user, url } = req.body;
  Users.find({ user: user }).exec()
    .then(resp => {
      if (resp.length === 0) {
        const document = new Users({ user: user, giphys: url });
        document.save()
          .then(resp => res.send(resp))
          .catch(err => console.log(`ERROR while saving document = ${err}`))
      }
      if (resp[0].giphys.includes(url)) {
        res.json('EXISTS')
      } else {
        console.log('mongoose.findOneAndUpdate\n', url)
        Users.findOneAndUpdate({ user: user }, { $push: { giphys: url } }).exec()
          .then(resp => res.send(resp))
          .catch(err => console.log(`ERROR while updating existing = ${err}`));
      }
    })
    .catch(err => console.log(`ERROR at /api/giphy/:user \n ${err}`));
});

module.exports = router;
