import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsNotEmpty()
    @IsString()
    password:string;

    
    @IsNotEmpty()
    @IsString()
    firstName:string;

    @IsOptional()
    lastName:string;

    @IsOptional()
    age:number;

    @IsOptional()
    favoriteFoods:Array<string>;
}