const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const get_user = async (req, res, next) => {
  const user = await User.findOne({
    username: req.userData.username,
    email: req.userData.email
  }).exec();

  if (!user) {
    return res.status(401).json({
      message: 'No user found for this token.'
    });
  }

  const details = {
    email: user.email,
    username: user.username,
    bio: user.bio,
    image: user.image
  };
  const token = jwt.sign(details, process.env.JWT_KEY, { expiresIn: '1h' });

  return res.status(200).json({
    user: {
      ...details,
      token
    }
  });
};

const update_user = async (req, res, next) => {
  const reqData = req.body.user;
  const oldData = req.userData;
  let user = null;

  if (reqData.username !== oldData.username) {
    user = await User.find({ username: reqData.username }).exec();
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'Username exists'
      });
    }
  }

  if (reqData.email !== oldData.email) {
    user = await User.find({ email: reqData.email }).exec();
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'Email exists'
      });
    }
  }

  const updateDetails = {
    email: reqData.email,
    username: reqData.username,
    bio: reqData.bio,
    image: reqData.image
  };

  if (reqData.password) {
    const hash = await bcrypt.hash(reqData.password, 10);
    updateDetails.password = hash;
  }

  const newUser = await User.findOneAndUpdate(
    { username: oldData.username, email: oldData.email },
    updateDetails
  ).exec();

  const details = {
    email: reqData.email,
    username: reqData.username,
    bio: reqData.bio,
    image: reqData.image
  };
  const token = jwt.sign(details, process.env.JWT_KEY, { expiresIn: '1h' });

  return res.status(200).json({
    user: {
      ...details,
      token
    }
  });
};

module.exports = { get_user, update_user };
