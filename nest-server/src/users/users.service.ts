import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './models/user.interface';
import { CreateUserDto } from './models/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async doesUserExists(createUserDto: CreateUserDto): Promise<boolean> {
    let users: User[] = await this.userModel
      .find({ username: createUserDto.username })
      .exec();

    if (users.length > 0) {
      return true;
    }

    users = await this.userModel.find({ email: createUserDto.email }).exec();

    if (users.length > 0) {
      return true;
    }

    return false;
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({
      username: createUserDto.username,
      email: createUserDto.email
    });
    createdUser.setPassword(createUserDto.password);
  }
}
