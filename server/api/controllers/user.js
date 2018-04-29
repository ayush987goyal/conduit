const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const get_user = async (req, res, next) => {
  const user = await User.findById(req.userData.id).exec();

  if (!user) {
    return res.status(401).json({
      message: 'No user found for this token.'
    });
  }

  return res.status(200).json({
    user: user.getAuthJson()
  });
};

const update_user = async (req, res, next) => {
  const reqData = req.body.user;

  const user = await User.findById(req.userData.id).exec();
  let users;

  if (!user) {
    return res.status(401).json({
      message: 'No user found for this token.'
    });
  }

  if (reqData.username !== user.username) {
    users = await User.find({ username: reqData.username }).exec();
    if (users.length >= 1) {
      return res.status(409).json({
        message: 'Username exists'
      });
    }
  }

  if (reqData.email !== user.email) {
    users = await User.find({ email: reqData.email }).exec();
    if (users.length >= 1) {
      return res.status(409).json({
        message: 'Email exists'
      });
    }
  }

  user.email = reqData.email;
  user.username = reqData.username;
  user.bio = reqData.bio;
  user.image = reqData.image;

  if (reqData.password) {
    await user.setPassword(reqData.password);
  }

  const result = user.save();

  return res.status(200).json({
    user: user.getAuthJson()
  });
};

module.exports = { get_user, update_user };
