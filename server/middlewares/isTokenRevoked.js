const revoke = require('../helpers/revokeSchema');

module.exports = (req, res, next) => {
  revoke.findOne({ token: req.headers.authorization })
    .then((mongoRes) => {
      if (mongoRes) {
        res.handle('THIS TOKEN HAS BEEN REVOKED');
      } else {
        next();
      }
    })
    .catch(() => {
      res.handle('UNKNOWN ERROR WHILE CHECKING IF REVOKED TOKEN');
    });
};
