import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ required: false, type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    favoriteFoods:Array<string>

    @ApiProperty({ required: false })
    @IsOptional()
    age:number;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    firstName:string;
}