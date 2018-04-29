const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const user_signup = async (req, res, next) => {
  const reqData = req.body.user;
  let user = await User.find({ username: reqData.username }).exec();
  if (user.length >= 1) {
    return res.status(409).json({
      message: 'Username exists'
    });
  }

  user = await User.find({ email: reqData.email }).exec();
  if (user.length >= 1) {
    return res.status(409).json({
      message: 'Email exists'
    });
  }

  const newUser = new User();

  newUser.email = reqData.email;
  newUser.username = reqData.username;
  await newUser.setPassword(reqData.password);

  const result = newUser.save();
  return res.status(200).json({
    user: newUser.getAuthJson()
  });
};

const user_login = async (req, res, next) => {
  const reqData = req.body.user;

  const user = await User.find({ email: reqData.email }).exec();
  if (user.length < 1) {
    return res.status(401).json({
      message: 'Invalid email or password'
    });
  }

  const isValid = await user[0].validatePassword(reqData.password);
  if (!isValid) {
    return res.status(401).json({
      message: 'Invalid email or password'
    });
  }

  return res.status(200).json({
    user: user[0].getAuthJson()
  });
};

module.exports = { user_signup, user_login };
