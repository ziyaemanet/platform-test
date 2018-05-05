const user = require('../helpers/userSchema');
const revoke = require('./revoke');
const token = require('../helpers/token');
const pbkdf2 = require('../helpers/pbkdf2');

const createUser = (req, res) => {
  const { password, email, name } = req.body;
  pbkdf2.hash(password)
    .then(hash => user.create({ name, email, password: hash }))
    .then(() => res.handle(null, {
      message: 'A token for your efforts...',
      token: token.generate(email),
    }))
    .catch((err) => {
      if (err instanceof Error) {
        res.handle('UNKNOWN ERROR DURING CREATE USER');
      } else {
        res.handle(err);
      }
    });
};

const getUser = (req, res) => {
  user.findOne({ email: req.user.email })
    .then((mongoRes) => {
      delete mongoRes.password;
      res.handle(null, mongoRes);
    })
    .catch(() => res.handle('UNKNOWN ERROR WITH GET USER'));
};

const updateUser = (req, res) => {
  const { password, email, name } = req.body;
  pbkdf2.hash(password)
    .then(hash => user.updateOne(
      { email: req.user.email },
      { name, email, password: hash }
    ))
    .then(() => res.handle(null, 'UPDATE USER SUCCESS'))
    .catch((err) => {
      if (err instanceof Error) {
        res.handle('UNKNOWN ERROR DURING UPDATE USER');
      } else {
        res.handle(err);
      }
    });
};

const deleteUser = (req, res) => {
  user.deleteOne({ email: req.user.email })
    .then(() => revoke.add(req, res))
    .catch(() => res.handle('ERROR DURING DELETE USER'));
};

module.exports = {
  createUser, getUser, updateUser, deleteUser,
};
