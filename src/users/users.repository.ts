import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name, 'demo') private _userModel: Model<UserDocument>,
  ) {}

  public async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this._userModel.findOne(userFilterQuery);
  }

  public async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this._userModel.find(userFilterQuery);
  }

  public async create(user: User): Promise<User | any> {
    const newUser:any = new this._userModel(user);
    return newUser.save()
  }

  public async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return this._userModel.findOneAndUpdate(userFilterQuery, user);
  }
}
