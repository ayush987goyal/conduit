const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/checkAuth');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const { create_article, list_articles } = require('../controllers/articles');

router.post('', checkAuth, asyncMiddleware(create_article));

router.get('', asyncMiddleware(list_articles));

module.exports = router;
