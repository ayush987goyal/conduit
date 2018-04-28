const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/checkAuth');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const { get_user } = require('../controllers/user');

router.get('/', checkAuth, asyncMiddleware(get_user));

module.exports = router;
