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

module.exports = { create_article };
