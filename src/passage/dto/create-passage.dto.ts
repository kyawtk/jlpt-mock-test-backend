import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePassageDto {
  @ApiProperty()
  @IsString()
  text: string;
}
