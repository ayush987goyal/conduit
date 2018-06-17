import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Article } from './models/article.interface';
import { ArticleForUser } from './models/article-for-user.dto';
import { User } from 'users/models/user.interface';

export class ArticleFilter {
  limit?: number;
  offset?: number;
  tag?: string;
  author?: string;
  favorited?: string;
  userId?: string;
}

export class CreateArticleDto {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async getArticles(articleFilter: ArticleFilter): Promise<{ articles: ArticleForUser[] }> {
    const limit = articleFilter.limit || 20;
    const offset = articleFilter.offset || 0;

    const query: any = {};
    if (articleFilter.tag) {
      query.tagList = { $in: [articleFilter.tag] };
    }

    const [author, favoritedBy] = await Promise.all([
      articleFilter.author ? this.userModel.findOne({ username: articleFilter.author }) : null,
      articleFilter.favorited ? this.userModel.findOne({ username: articleFilter.favorited }) : null
    ]);

    if (author) {
      query.author = author.id;
    }

    if (favoritedBy) {
      query._id = { $in: favoritedBy.favorites };
    }

    const user = articleFilter.userId
      ? await this.userModel.findById(articleFilter.userId).exec()
      : null;

    const articles = await this.articleModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('author')
      .exec();

    return { articles: articles.map(article => article.getJsonFor(user)) };
  }

  async createArticle(
    userId: string,
    articleData: CreateArticleDto
  ): Promise<{ article: ArticleForUser }> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new HttpException('Not a valid user.', HttpStatus.FORBIDDEN);
    }

    const article = new this.articleModel({
      title: articleData.title,
      description: articleData.description,
      body: articleData.body,
      tagList: articleData.tagList,
      author: user
    });

    await article.save();

    return { article: article.getJsonFor(user) };
  }
}
