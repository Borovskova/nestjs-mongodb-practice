import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name, 'users') private _userModel: Model<UserDocument>,
  ) {}

  public async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return await this._userModel.findOne(userFilterQuery);
  }

  public async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
    return await this._userModel.find(userFilterQuery);
  }

  public async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return await this._userModel.findOneAndUpdate(userFilterQuery, user, { new: true });
  }

  public async deleteOne(
    userFilterQuery: FilterQuery<User>
  ): Promise<any> {
    return await this._userModel.deleteOne(userFilterQuery);
  }
}
