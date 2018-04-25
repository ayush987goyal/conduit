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

  const hash = await bcrypt.hash(reqData.password, 10);
  const newUser = new User({
    email: reqData.email,
    password: hash,
    username: reqData.username
  });

  const result = newUser.save();
  const details = { email: reqData.email, username: reqData.username, bio: null, image: null };
  const token = jwt.sign(details, process.env.JWT_KEY, { expiresIn: '1h' });

  return res.status(200).json({
    user: {
      ...details,
      token
    }
  });
};

const user_login = async (req, res, next) => {
  const reqData = req.body.user;
  const user = await User.find({ email: reqData.email }).exec();
  if (user.length < 1) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }

  const isValid = await bcrypt.compare(reqData.password, user[0].password);
  if (!isValid) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }

  const details = {
    email: user[0].email,
    username: user[0].username,
    bio: user[0].bio,
    image: user[0].image
  };
  const token = jwt.sign(details, process.env.JWT_KEY, { expiresIn: '1h' });

  return res.status(200).json({
    user: {
      ...details,
      token
    }
  });
};

module.exports = { user_signup, user_login };
