const mongoose = require('mongoose');
const User = require('../models/user');
const Article = require('../models/article');

const create_article = async (req, res, next) => {
  const reqData = req.body.article;

  const user = await User.findById(req.userData.id).exec();
  if (!user) {
    return res.status(401).json({
      message: 'Not a valid user.'
    });
  }

  const article = new Article(reqData);
  article.author = user;

  const result = await article.save();

  return res.status(200).json({
    article: article.getJsonFor(user)
  });
};

const list_articles = async (req, res, next) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;

  let query = {};
  if (req.query.tag) {
    query.tagList = { $in: [req.query.tag] };
  }

  const [author, favoritedBy] = await Promise.all([
    req.query.author ? User.findOne({ username: req.query.author }) : null,
    req.query.favorited ? User.findOne({ username: req.query.favorited }) : null
  ]);

  if (author) {
    query.author = author.id;
  }

  if (favoritedBy) {
    query._id = { $in: favoritedBy.favorites };
  }

  const user = req.userData ? await User.findById(req.userData.id) : null;

  const articles = await Article.find(query)
    .sort({ createdAt: -1 })
    .skip(+offset)
    .limit(+limit)
    .populate('author')
    .exec();

  return res.status(200).json({
    articles: articles.map(article => article.getJsonFor(user))
  });
};

const feed_articles = async (req, res, next) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;

  const user = await User.findById(req.userData.id).exec();
  if (!user) {
    return res.status(401).json({
      message: 'Not a valid user.'
    });
  }

  const articles = await Article.find({ author: { $in: user.following } })
    .sort({ createdAt: -1 })
    .skip(+offset)
    .limit(+limit)
    .populate('author')
    .exec();

  return res.status(200).json({
    articles: articles.map(article => article.getJsonFor(user))
  });
};

module.exports = { create_article, list_articles, feed_articles };
