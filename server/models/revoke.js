const revoke = require('../helpers/revokeSchema');

const add = (req, res) => {
  revoke.create({ token: req.headers.authorization })
    .then(() => res.handle(null, 'YOU HAVE LOGGED OUT'))
    .catch((err) => {
      console.log('ERR DURING LOGOUT: ', err);
      res.handle('ERROR DURING LOGOUT');
    });
};

module.exports = { add };
