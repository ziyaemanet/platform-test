const router = require('express').Router();
const login = require('../models/login');

router.route('/').get(login);

module.exports = router;
