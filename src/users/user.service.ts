import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";

import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";


@Injectable()
export class UsersService {
    constructor(private readonly _usersRepository: UsersRepository) {}

    public async getUser(userId: string): Promise<User> {
        const user = await this._usersRepository.findOne({ userId})
        if(!user){
          throw new HttpException(
            'User not found',
            HttpStatus.BAD_REQUEST,
          );
        }
        return await user
    }

    public async getUsers(): Promise<User[]> {
        return await this._usersRepository.find({});
    }

    public async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
      const userUpdatesParsed = {
        updatedAt: new Date(),
        ...userUpdates,
      };
        return await this._usersRepository.findOneAndUpdate({ userId }, userUpdatesParsed);
    }

    public async deleteUser(userId: string): Promise<Object> {
        const user = await this._usersRepository.findOne({ userId: userId})
        if(!user){
          throw new HttpException(
            'User not found',
            HttpStatus.BAD_REQUEST,
          );
        }
        return await this._usersRepository.deleteOne({ userId });
    }
}