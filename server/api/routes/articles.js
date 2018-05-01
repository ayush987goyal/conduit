const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/checkAuth');
const optionalCheckAth = require('../middlewares/optionalCheckAuth');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const { create_article, list_articles, feed_articles } = require('../controllers/articles');

router.post('', checkAuth, asyncMiddleware(create_article));

router.get('', optionalCheckAth, asyncMiddleware(list_articles));

router.get('/feed', checkAuth, asyncMiddleware(feed_articles));

module.exports = router;
