const router = require('express').Router();
const user = require('../models/user');
const jwtAuthz = require('express-jwt-authz');

const checkUserAuth = jwtAuthz(['user']);

router.route('/')
  .post(user.createUser)
  .get(checkUserAuth, user.getUser)
  .put(checkUserAuth, user.updateUser)
  .delete(checkUserAuth, user.deleteUser);

module.exports = router;
