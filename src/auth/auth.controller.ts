import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginUserDto } from './dto/login-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('signin')
  public async signin(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ token: string }> {
    return this._authService.signin(loginUserDto);
  }

  @Post('signup')
  public async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    const user = await this._authService.signup(createUserDto);
    return user;
  }
}
