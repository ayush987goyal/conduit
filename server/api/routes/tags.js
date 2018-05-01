const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Article = require('../models/article');

const asyncMiddleware = require('../middlewares/asyncMiddleware');

router.get(
  '',
  asyncMiddleware(async (req, res, next) => {
    const articles = await Article.find({}).exec();

    let tags = [].concat(...articles.map(article => article.tagList));
    tags = [...new Set(tags)];

    return res.status(200).json({
      tags
    });
  })
);

module.exports = router;
