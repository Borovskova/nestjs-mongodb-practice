import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetBookmarkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
