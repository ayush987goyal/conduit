const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    bio: String,
    image: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.password = hash;
};

userSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.makeJWT = function() {
  return jwt.sign(
    {
      id: this._id,
      username: this.username
    },
    process.env.JWT_KEY
  );
};

userSchema.methods.getAuthJson = function() {
  return {
    email: this.email,
    token: this.makeJWT(),
    username: this.username,
    bio: this.bio,
    image: this.image
  };
};

userSchema.methods.getProfileJson = function(user) {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: user.isFollowing(this._id)
  };
};

userSchema.methods.isFollowing = function(userId) {
  return this.following.indexOf(userId) > -1;
};

userSchema.methods.addToFavorites = function(articleId) {
  if (this.favorites.indexOf(articleId) === -1) {
    this.favorites.push(articleId);
  }

  return this.save();
};

userSchema.methods.removeFromFavorites = function(articleId) {
  this.favorites.remove(articleId);

  return this.save();
};

userSchema.methods.isFavorited = function(articleId) {
  return this.favorites.indexOf(articleId) > -1;
};

module.exports = mongoose.model('User', userSchema);
