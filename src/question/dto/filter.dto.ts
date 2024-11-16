import { ApiPropertyOptional } from '@nestjs/swagger';
import { Levels, QuestionTypes } from '@prisma/client';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class FilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  type?: QuestionTypes;

  @ApiPropertyOptional()
  @IsOptional()
  level?: Levels;

  @ApiPropertyOptional({ description: 'Page number for pagination' })
  @IsInt()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Number of records per page' })
  @IsInt()
  @IsOptional()
  limit?: number;
}
