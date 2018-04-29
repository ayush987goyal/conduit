const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const User = require('./user');

const articleSchema = Schema(
  {
    title: String,
    slug: { type: String, slug: 'title', unique: true },
    description: String,
    body: String,
    tagList: [String],
    favoritesCount: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { timestamps: true }
);

articleSchema.methods.updateFavoriteCount = async function() {
  const count = await User.count({ favorites: { $in: [this._id] } }).exec();
  this.favoritesCount = count;

  return this.save();
};

articleSchema.methods.getJsonFor = function(user) {
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    tagList: this.tagList,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    favorited: user.isFavorited(this._id),
    favoritesCount: this.favoritesCount,
    author: this.author.getProfileJson(user)
  };
};

module.exports = mongoose.model('Article', articleSchema);
