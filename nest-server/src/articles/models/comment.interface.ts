import { Document } from 'mongoose';
import { User } from 'users/models/user.interface';

export interface Comment extends Document {
  body: string;
  author: User;
}
