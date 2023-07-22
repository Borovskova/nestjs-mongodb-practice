import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly _usersRepository: UsersRepository,
  ) {}

  public async getUser(
    userId: string,
  ): Promise<User> {
    if (!Types.ObjectId.isValid(userId))
      throw new HttpException(
        'Invalid userId',
        HttpStatus.BAD_REQUEST,
      );

    const user =
      await this._usersRepository.findOne({
        _id: userId,
      });
    if (!user) {
      console.log(user);
      
      throw new HttpException(
        'User not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await user;
  }

  public async getUsers(): Promise<User[]> {
    return await this._usersRepository.find({});
  }

  public async updateUser(
    userId: string,
    userUpdates: UpdateUserDto,
  ): Promise<User> {
    const userUpdatesParsed = {
      ...userUpdates,
    };
    return await this._usersRepository.findOneAndUpdate(
      { _id: userId },
      userUpdatesParsed,
    );
  }

  public async deleteUser(
    userId: string,
  ): Promise<Object> {
    const user =
      await this._usersRepository.findOne({
        _id: userId,
      });
    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this._usersRepository.deleteOne({
      _id: userId,
    });
  }
}
