import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { v4 as uuidv4 } from 'uuid';

import { AuthRepository } from './auth.repository';
import { User } from 'src/users/schemas/user.schema';
import { LoginUserDto } from './dto/login-user-dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(private readonly _authRepository: AuthRepository,  private _jwtService: JwtService) {}

    public async signin(loginUserDto: LoginUserDto): Promise<{token:string}> {
      const user = await this._authRepository.findOne({ email: loginUserDto.email})
   
      if(!user){
        throw new HttpException(
          'User not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      if(loginUserDto.password !== user.password){
        throw new HttpException(
          'Wrong password',
          HttpStatus.BAD_REQUEST,
        );
      }
      const payload = { id: user.userId, username: user.firstName, useremail: user.email};
      return {
        token: await this._jwtService.signAsync(payload),
      };
    }

    public async signup(createUserDto: CreateUserDto): Promise<{token:string}> {
        let findUser = await this._authRepository.findOne({
            email: createUserDto.email,
          });
          if (findUser) {
            throw new HttpException(
              'This email already in use!',
              HttpStatus.BAD_REQUEST,
            );
          }
        const user = await this._authRepository.create({
            userId: uuidv4(),
            email: createUserDto.email,
            password: createUserDto.password,
            age: createUserDto.age ? createUserDto.age : null,
            firstName: createUserDto.firstName ? createUserDto.firstName : null,
            lastName: createUserDto.lastName ? createUserDto.lastName : null,
            favoriteFoods: createUserDto.favoriteFoods && createUserDto.favoriteFoods.length ? createUserDto.favoriteFoods : []
        })
      const payload = { id: user.userId, username: user.firstName, useremail: user.email };
      return {
        token: await this._jwtService.signAsync(payload),
      };
    }

}
