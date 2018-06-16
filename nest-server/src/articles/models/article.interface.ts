import { Document } from 'mongoose';

import { User } from 'users/models/user.interface';
import { Comment } from './comment.interface';
import { ArticleForUser } from './article-for-user.dto';

export interface Article extends Document {
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: string[];
  readonly favoritesCount: number;
  readonly author: User[];
  readonly comments: Comment[];
  readonly updateFavoriteCount: () => void;
  readonly getJsonFor: (user: User) => ArticleForUser;
}
