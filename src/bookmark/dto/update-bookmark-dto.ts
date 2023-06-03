import { IsOptional } from "class-validator";

export class UpdateBookmarkDto {
   @IsOptional()
    title: string;
  
    @IsOptional()
    description: string;
}