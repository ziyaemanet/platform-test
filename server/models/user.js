const mongoose = require('mongoose');
const pbkdf2 = require('../helpers/pbkdf2');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { minimize: false });

const user = mongoose.model('users', userSchema);

const createUser = (req, res) => {
  console.log('REQUEST: ', req.body);
  const { password, email, name } = req.body;
  pbkdf2.hash(password)
    .then(hash => user.create({ name, email, password: hash }))
    .then((mongoRes) => {
      console.log('MONGO RES: ', mongoRes);
      res.handle(null, 'CREATE USER SUCCESS!');
    })
    .catch((err) => {
      console.log('ERR CREATEUSER: ', err);
      res.handle(err);
    });
};

const getUser = (req, res) => {
  const { name } = req.body;
  //  TODO: change target to name in token
  user.findOne({ name })
    .then((mongoRes) => {
      console.log('MONGO RES: ', mongoRes);
      res.handle(null, mongoRes);
    })
    .catch((err) => {
      console.log('ERR GET USER: ', err);
      res.handle(err);
    });
};

const updateUser = (req, res) => {
  const { password, email, name } = req.body;
  //  TODO: change target to name in token
  pbkdf2.hash(password)
    .then(hash => user.updateOne({ name }, { name, email, password: hash }))
    .then((mongoRes) => {
      console.log('MONGO RES: ', mongoRes);
      res.handle(null, 'UPDATE USER SUCCESS!');
    })
    .catch((err) => {
      console.log('ERR UPDATE USER: ', err);
      res.handle(err);
    });
};

const deleteUser = (req, res) => {
  const { name } = req.body;
  //  TODO: change target to name in token
  user.deleteOne({ name })
    .then((mongoRes) => {
      console.log('MONGO RES: ', mongoRes);
      res.handle(null, 'DELETE USER SUCCESS!');
    })
    .catch((err) => {
      console.log('ERR DELETE USER: ', err);
      res.handle(err);
    });
};

module.exports = {
  createUser, getUser, updateUser, deleteUser,
};
