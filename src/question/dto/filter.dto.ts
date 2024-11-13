import { ApiPropertyOptional } from '@nestjs/swagger';
import { Levels, QuestionTypes } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class FilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  type?: QuestionTypes;

  @ApiPropertyOptional()
  @IsOptional()
  level?: Levels;
}
