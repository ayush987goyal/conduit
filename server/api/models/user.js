const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    bio: String,
    image: String
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
    process.env.JWT_KEY,
    { expiresIn: '1h' }
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

module.exports = mongoose.model('User', userSchema);
