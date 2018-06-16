import { Schema, model } from 'mongoose';

import { UserSchema } from 'users/models/user.schema';
const User = model('User', UserSchema);

export const ArticleSchema = new Schema(
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

ArticleSchema.methods.updateFavoriteCount = async function() {
  const count = await User.count({ favorites: { $in: [this._id] } }).exec();
  this.favoritesCount = count;

  return this.save();
};

ArticleSchema.methods.getJsonFor = function(user) {
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    tagList: this.tagList,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    favorited: user ? user.isFavorited(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.getProfileJson(user)
  };
};
