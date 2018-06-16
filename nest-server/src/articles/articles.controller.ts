import { Controller, Get, Post, Req } from '@nestjs/common';

import { ArticlesService, ArticleFilter } from './articles.service';
import { ArticleForUser } from './models/article-for-user.dto';

@Controller('/api/articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  async getArticles(@Req() req): Promise<{ articles: ArticleForUser[] }> {
    const filters: ArticleFilter = {
      limit: +req.query.limit,
      offset: +req.query.offset,
      tag: req.query.tag,
      author: req.query.author,
      favorited: req.query.favorited,
      userId: req.userData ? req.userData.id : null
    };
    return this.articlesService.getArticles(filters);
  }

  @Post()
  async createArticle() {}

  @Get('/feed')
  async getFeed() {}
}
