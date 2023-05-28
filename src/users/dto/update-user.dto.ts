import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    favoriteFood:Array<string>

    @IsNotEmpty()
    age:number;
}