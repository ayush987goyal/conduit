import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGOLAB_URI), UsersModule, TagsModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
