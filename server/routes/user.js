const router = require('express').Router();
const user = require('../models/user');
const jwtAuthz = require('express-jwt-authz');
const jwt = require('express-jwt');
const handleInvalidToken = require('../middlewares/handleInvalidToken');
const isTokenRevoked = require('../middlewares/isTokenRevoked');

const validateUserAuth = jwtAuthz(['users']);
const validateJwt = jwt({ secret: 'secret' });
const middleware = [isTokenRevoked, validateJwt, handleInvalidToken, validateUserAuth];

router.route('/')
  .post(user.createUser)
  .get(...middleware, user.getUser)
  .put(...middleware, user.updateUser)
  .delete(...middleware, user.deleteUser);

module.exports = router;
