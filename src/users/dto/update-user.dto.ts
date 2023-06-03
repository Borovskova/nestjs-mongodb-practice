import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    favoriteFoods:Array<string>

    @IsOptional()
    age:number;

    @IsNotEmpty()
    firstName:string;
}