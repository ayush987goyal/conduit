import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Article } from 'articles/models/article.interface';

@Injectable()
export class TagsService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) {}

  async getTags(): Promise<{ tags: string[] }> {
    const articles = await this.articleModel.find({}).exec();

    let tags = [].concat(...articles.map(article => article.tagList));
    tags = [...new Set(tags)];

    return { tags };
  }
}
