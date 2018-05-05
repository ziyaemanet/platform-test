const revoke = require('../helpers/revokeSchema');

const isTokenRevoked = (req, res, next) => {
  revoke.findOne({ token: req.headers.authorization })
    .then((mongoRes) => {
      if (mongoRes) {
        res.handle('THIS TOKEN HAS BEEN REVOKED');
      } else {
        next();
      }
    })
    .catch((err) => {
      if (err instanceof Error) {
        res.handle('UNKNOWN ERROR WHILE CHECKING IF REVOKED TOKEN');
      } else {
        res.handle(err);
      }
    });
};

module.exports = isTokenRevoked;
