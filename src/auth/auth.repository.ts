import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';



@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private _userModel: Model<User>,
  ) {}

  public async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return await this._userModel.findOne(userFilterQuery);
  }


  public async create(user: User | any): Promise<User> {
    const newUser: User = new this._userModel(user);
    return await newUser.save()
  }
}
