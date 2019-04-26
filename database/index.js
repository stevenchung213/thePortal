require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = `mongodb://localhost:27017/thePortal`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => {
    console.log(`mongoDB connected at ${mongoUri}`);
  })
  .catch(err => console.log(err));

const usersSchema = new mongoose.Schema({
  user: String,
  giphys: [String]
});

const Users = mongoose.model('users', usersSchema);

module.exports = Users;
