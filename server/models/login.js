const user = require('../helpers/userSchema');
const pbkdf2 = require('../helpers/pbkdf2');
const token = require('../helpers/token');

module.exports = (req, res) => {
  const { password, email } = req.body;

  user.findOne({ email })
    .then((mongoRes) => {
      if (!mongoRes) {
        // email does not exist
        return Promise.reject('INVALID PASSWORD OR EMAIL');
      }
      return pbkdf2.compare(password, mongoRes.password);
    })
    .then((isValidPassword) => {
      if (isValidPassword) {
        res.handle(null, {
          message: 'A token for your efforts...',
          token: token.generate(email),
        });
      } else {
        // bad password
        return Promise.reject('INVALID PASSWORD OR EMAIL');
      }
    })
    .catch((err) => {
      if (err instanceof Error) {
        res.handle('UNKNOWN ERROR DURING LOGIN');
      } else {
        res.handle(err);
      }
    });
};
