const revoke = require('../helpers/revokeSchema');

const add = (req, res) => {
  revoke.create({ token: req.headers.authorization })
    .then(() => res.handle(null, 'YOUR TOKEN AND/OR USER HAS BEEN REVOKED'))
    .catch(() => res.handle('ERROR DURING REVOKING TOKEN'));
};

module.exports = { add };
