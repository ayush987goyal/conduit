import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

import { ArticleSchema } from 'articles/models/article.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }])],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
