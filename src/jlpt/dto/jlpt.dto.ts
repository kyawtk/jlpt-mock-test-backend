// src/jlpt/dto/create-option.dto.ts
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CreateAnswerDto {
  @IsInt()
  @IsNotEmpty()
  optionId: number;
}

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    type: string; // e.g., "vocabulary", "grammar", "reading", "listening"

    @IsNotEmpty()
    @IsString()
    content: string; // The question text or prompt

    @IsOptional()
    @IsString()
    passage?: string; // For reading questions, can store the reading passage text

    @IsOptional()
    @IsString()
    audioUrl?: string; // For listening questions, URL to audio file

    @IsArray()
    @IsOptional()
    options?: CreateOptionDto[]; // Assuming CreateOptionDto is defined
  }

export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  level: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
