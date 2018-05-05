const router = require('express').Router();
const user = require('../models/user');
const jwtAuthz = require('express-jwt-authz');
const jwt = require('express-jwt');
const handleInvalidToken = require('../middlewares/handleInvalidToken');

const validateUserAuth = jwtAuthz(['users']);
const validateJwt = jwt({ secret: 'secret' });

router.route('/')
  .post(user.createUser)
  .get(validateJwt, handleInvalidToken, validateUserAuth, user.getUser)
  .put(validateJwt, handleInvalidToken, validateUserAuth, user.updateUser)
  .delete(validateJwt, handleInvalidToken, validateUserAuth, user.deleteUser);

module.exports = router;
