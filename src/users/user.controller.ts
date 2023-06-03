import { Body, Controller, Get, Param, Patch, Delete, Request, UseGuards } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth-guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  public async getUser(@Request() req): Promise<User> {
    return this.usersService.getUser(req.user.id);
  }

  @Get()
  public async getUsers(): Promise<User[]> {
      return this.usersService.getUsers();
  }

  @Patch(':userId')
  public async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
      return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  public async deleteUser(@Param('userId') userId: string): Promise<any> {
    return this.usersService.deleteUser(userId);
  }
}