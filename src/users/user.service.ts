import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from "./dto/update-user.dto";

import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUserById(userId: string): Promise<User> {
        return this.usersRepository.findOne({ userId })
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        let findUser = await this.usersRepository.findOne({
            email: createUserDto.email,
          });
          if (findUser) {
            throw new HttpException(
              'This user already exist.',
              HttpStatus.BAD_REQUEST,
            );
          }
        return this.usersRepository.create({
            userId: uuidv4(),
            email: createUserDto.email,
            password: createUserDto.password,
            age: createUserDto.age,
            favoriteFoods: []
        })
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
        return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
    }
}