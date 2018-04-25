const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const { user_signup, user_login } = require('../controllers/users');

router.post('/', asyncMiddleware(user_signup));

router.post('/login', asyncMiddleware(user_login));

module.exports = router;
