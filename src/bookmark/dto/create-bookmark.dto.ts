import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsString } from "class-validator";

export class CreateBookmarkDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    link: string;
}