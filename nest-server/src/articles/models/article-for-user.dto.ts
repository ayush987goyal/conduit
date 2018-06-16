import { UserProfileDto } from 'users/models/user-profile.dto';

export class ArticleForUser {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: UserProfileDto;
}
