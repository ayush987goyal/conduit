import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './models/user.interface';
import { CreateUserDto } from './models/create-user.dto';
import { UserAuthDto } from './models/user-auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<{ user: UserAuthDto }> {
    let users: User[] = await this.userModel
      .find({ username: createUserDto.username })
      .exec();

    if (users.length > 0) {
      throw new HttpException('username or email exists', HttpStatus.CONFLICT);
    }

    users = await this.userModel.find({ email: createUserDto.email }).exec();

    if (users.length > 0) {
      throw new HttpException('username or email exists', HttpStatus.CONFLICT);
    }

    const createdUser = new this.userModel({
      username: createUserDto.username,
      email: createUserDto.email
    });
    await createdUser.setPassword(createUserDto.password);
    await createdUser.save();
    return { user: createdUser.getAuthJson() };
  }

  async loginUser(
    createUserDto: CreateUserDto
  ): Promise<{ user: UserAuthDto }> {
    const users: User[] = await this.userModel
      .find({ email: createUserDto.email })
      .exec();

    if (users.length < 1) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.FORBIDDEN
      );
    }

    const isValid = await users[0].validatePassword(createUserDto.password);
    if (!isValid) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.FORBIDDEN
      );
    }

    return { user: users[0].getAuthJson() };
  }

  async getUserById(id: string): Promise<{ user: UserAuthDto }> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new HttpException(
        'No user found for this token.',
        HttpStatus.NOT_FOUND
      );
    }

    return { user: user.getAuthJson() };
  }
}
