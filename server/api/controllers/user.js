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

module.exports = { get_user };
