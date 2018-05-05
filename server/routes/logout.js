const router = require('express').Router();
const logout = require('../models/logout');
const jwtAuthz = require('express-jwt-authz');

const checkUserAuth = jwtAuthz(['user']);

router.route('/').get(checkUserAuth, logout);

module.exports = router;
