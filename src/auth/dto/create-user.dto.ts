import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  age: number;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  favoriteFoods: Array<string>;
}
