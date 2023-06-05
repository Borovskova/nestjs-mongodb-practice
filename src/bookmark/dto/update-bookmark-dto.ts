import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateBookmarkDto {
  @ApiProperty({ required: false })
  @IsOptional()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description: string;
}
