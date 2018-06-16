import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const UserSchema = new Schema(
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

UserSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.password = hash;
};

UserSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.makeJWT = function() {
  return jwt.sign(
    {
      id: this._id,
      username: this.username
    },
    process.env.JWT_KEY
  );
};

UserSchema.methods.getAuthJson = function() {
  return {
    email: this.email,
    token: this.makeJWT(),
    username: this.username,
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.getProfileJson = function(user) {
  return {
    username: this.username,
    bio: this.bio,
    image:
      this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: user ? user.isFollowing(this._id) : false
  };
};

UserSchema.methods.isFollowing = function(userId) {
  return this.following.indexOf(userId) > -1;
};

UserSchema.methods.addToFavorites = function(articleId) {
  if (this.favorites.indexOf(articleId) === -1) {
    this.favorites.push(articleId);
  }

  return this.save();
};

UserSchema.methods.removeFromFavorites = function(articleId) {
  this.favorites.remove(articleId);

  return this.save();
};

UserSchema.methods.isFavorited = function(articleId) {
  return this.favorites.indexOf(articleId) > -1;
};
