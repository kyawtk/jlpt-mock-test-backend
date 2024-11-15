import { ApiPropertyOptional } from '@nestjs/swagger';
import { Levels, QuestionTypes } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class FilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  type?: QuestionTypes;

  @ApiPropertyOptional()
  @IsOptional()
  level?: Levels;

  @ApiPropertyOptional({ description: 'Page number for pagination' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;

  @ApiPropertyOptional({ description: 'Number of records per page' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number;
}
