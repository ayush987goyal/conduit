const express = require('express');
const router = express.Router();

const { user_signup } = require('../controllers/users');

router.post('/', user_signup);

module.exports = router;
