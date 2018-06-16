import { Controller, Post, Body, Get, Req, Put } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './models/create-user.dto';
import { UserAuthDto } from './models/user-auth.dto';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async signup(
    @Body('user') createUserDto: CreateUserDto
  ): Promise<{ user: UserAuthDto }> {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/login')
  async login(
    @Body('user') createUserDto: CreateUserDto
  ): Promise<{ user: UserAuthDto }> {
    return this.usersService.loginUser(createUserDto);
  }

  @Get()
  async getUser(@Req() request): Promise<{ user: UserAuthDto }> {
    return this.usersService.getUserById(request.userData.id);
  }

  @Put()
  async updateUser(
    @Req() request,
    @Body('user') createUserDto: CreateUserDto
  ): Promise<{ user: UserAuthDto }> {
    return this.usersService.updateUser(request.userData.id, createUserDto);
  }
}
