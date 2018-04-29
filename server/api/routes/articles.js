const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/checkAuth');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const { create_article } = require('../controllers/articles');

router.post('', checkAuth, asyncMiddleware(create_article));

module.exports = router;
