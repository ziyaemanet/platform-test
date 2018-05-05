const user = require('../helpers/userSchema');
const pbkdf2 = require('../helpers/pbkdf2');

const createUser = (req, res) => {
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
  user.findOne({ email: req.user.email })
    .then((mongoRes) => {
      console.log('MONGO RES: ', mongoRes);
      delete mongoRes.password;
      res.handle(null, mongoRes);
    })
    .catch((err) => {
      console.log('ERR GET USER: ', err);
      res.handle(err);
    });
};

const updateUser = (req, res) => {
  const { password, email, name } = req.body;
  pbkdf2.hash(password)
    .then(hash => user.updateOne(
      { email: req.user.email },
      { name, email, password: hash }
    ))
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
  //  TODO: revoke token
  user.deleteOne({ email: req.user.email })
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
