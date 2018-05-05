const router = require('express').Router();
const login = require('../models/login');

router.route('/').post(login);

module.exports = router;
