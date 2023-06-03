import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { User, UserDocument } from 'src/users/schemas/user.schema';



@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name, 'users') private _userModel: Model<UserDocument>,
  ) {}

  public async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this._userModel.findOne(userFilterQuery);
  }


  public async create(user: User): Promise<User | any> {
    const newUser:any = new this._userModel(user);
    return newUser.save()
  }
}
