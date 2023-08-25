import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginUserDto } from './dto/login-user-dto';
import { UsersRepository } from 'src/users/users.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { compareHash, getHash } from './constants/bcrypt';

export const PasswordSaltLength = 4;
@Injectable()
export class AuthService {
  constructor(
    private readonly _usersRepository: UsersRepository,
    private _jwtService: JwtService,
  ) {}

  public async signin(
    loginUserDto: LoginUserDto,
  ): Promise<{ token: string }> {
    const user = await this._usersRepository.findOne({
      email: loginUserDto.email,
    });

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      await compareHash(
        loginUserDto.password,
        user.password as string,
      )
    )
      return await this._signToken(user);
    throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
  }

  public async signup(
    createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    let findUser = await this._usersRepository.findOne({
      email: createUserDto.email,
    });
    if (findUser) {
      throw new HttpException(
        'This email already in use!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this._usersRepository.create({
      email: createUserDto.email,
      password: await getHash(
        createUserDto.password,
        PasswordSaltLength,
      ),
      age: createUserDto.age ? createUserDto.age : null,
      firstName: createUserDto.firstName
        ? createUserDto.firstName
        : null,
      lastName: createUserDto.lastName
        ? createUserDto.lastName
        : null,
      favoriteFoods:
        createUserDto.favoriteFoods &&
        createUserDto.favoriteFoods.length
          ? createUserDto.favoriteFoods
          : [],
    });

    return await this._signToken(user);
  }

  private async _signToken(user: User): Promise<{ token: string }> {
    const payload = {
      id: user._id,
      username: user.firstName,
      useremail: user.email,
    };
    return {
      token: await this._jwtService.signAsync(payload),
    };
  }
}
