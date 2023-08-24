import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';

import { User } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private _userModel: Model<User>,
  ) {}

  public async findOne(
    userFilterQuery: FilterQuery<User>,
  ): Promise<User> {
    return await this._userModel.findOne(userFilterQuery);
  }

  public async find(
    userFilterQuery: FilterQuery<User>,
  ): Promise<User[]> {
    return await this._userModel.find(userFilterQuery);
  }

  public async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return await this._userModel.findOneAndUpdate(
      userFilterQuery,
      user,
      { new: true },
    );
  }

  public async deleteOne(
    userFilterQuery: FilterQuery<User>,
  ): Promise<Object> {
    return await this._userModel.deleteOne(userFilterQuery);
  }

  public async create(user: User | any): Promise<User> {
    const newUser: User = new this._userModel(user);
    return await newUser.save();
  }
}
