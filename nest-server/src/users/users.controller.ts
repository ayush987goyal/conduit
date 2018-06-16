import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './models/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async signup(@Body('user') createUserDto: CreateUserDto) {
    if (this.usersService.doesUserExists(createUserDto)) {
      throw new HttpException('username or email exists', HttpStatus.CONFLICT);
    }
  }
}
