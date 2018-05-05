const user = require('../helpers/userSchema');
const pbkdf2 = require('../helpers/pbkdf2');
const token = require('../helpers/token');

module.exports = (req, res) => {
  const { password, email } = req.body;

  user.findOne({ email })
    .then(mongoRes => pbkdf2.compare(password, mongoRes.password))
    .then((isValidPassword) => {
      if (isValidPassword) {
        res.handle(null, {
          message: 'A token for your efforts...',
          token: token.generate(email),
        });
      } else {
        return Promise.reject('INVALID PASSWORD');
      }
    })
    .catch((err) => {
      console.log('ERR LOGIN: ', err);
      if (err instanceof Error) {
        res.handle('UNKNOWN ERROR DURING LOGIN');
      } else {
        res.handle(err);
      }
    });
};
