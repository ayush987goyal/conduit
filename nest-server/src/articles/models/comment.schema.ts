import { Schema } from 'mongoose';

export const commentSchema = new Schema(
  {
    body: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);
