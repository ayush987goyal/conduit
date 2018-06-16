import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CheckAuthMiddleware } from 'middlewares/check-auth/check-auth.middleware';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleSchema } from './models/article.schema';
import { UserSchema } from 'users/models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema },
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware)
      .with([{ type: 'optional', path: '/', method: RequestMethod.GET }])
      .forRoutes(ArticlesController);
  }
}
