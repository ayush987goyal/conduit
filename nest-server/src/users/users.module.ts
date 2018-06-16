import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserSchema } from './models/user.schema';
import { UsersService } from './users.service';
import { CheckAuthMiddleware } from 'middlewares/check-auth/check-auth.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware)
      .with([
        { type: 'exclude', path: '/', method: RequestMethod.POST },
        {
          type: 'exclude',
          path: '/login',
          method: RequestMethod.POST
        }
      ])
      .forRoutes(UsersController);
  }
}
