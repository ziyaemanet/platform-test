const router = require('express').Router();
const revoke = require('../models/revoke');
const jwtAuthz = require('express-jwt-authz');
const jwt = require('express-jwt');
const handleInvalidToken = require('../middlewares/handleInvalidToken');
const isTokenRevoked = require('../middlewares/isTokenRevoked');

const validateUserAuth = jwtAuthz(['users']);
const validateJwt = jwt({ secret: 'secret' });
const middleware = [isTokenRevoked, validateJwt, handleInvalidToken, validateUserAuth];

router.route('/').delete(...middleware, revoke.add);

module.exports = router;
