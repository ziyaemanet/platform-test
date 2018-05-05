const jwt = require('jsonwebtoken');

const get = email => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + 600,
  email,
  scope: 'users',
}, 'secret');

module.exports = { get };
