import { ApiProperty } from '@nestjs/swagger';
import { Levels, QuestionTypes } from '@prisma/client';
import {
  IsArray,
  isEnum,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
// DTO for individual options in a question
export class CreateOptionDto {
  @IsNotEmpty()
  @IsString()
  label: string; // e.g., "A", "B", "C", "D"

  @IsNotEmpty()
  @IsString()
  content: string; // Text of the answer option
}

// Main DTO for creating a question
export class CreateQuestionDto {
  @ApiProperty({ enum: QuestionTypes })
  @IsNotEmpty()
  @IsEnum(QuestionTypes)
  type: QuestionTypes; // e.g., "vocabulary", "grammar", "reading", "listening"

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string; // The question text or prompt

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  passageId: number; // For reading questions, stores the passage text

  @ApiProperty()
  @IsOptional()
  audioUrl?: string; // URL to an audio file, if applicable

  @ApiProperty()
  @IsOptional()
  imageUrl?: string; // URL to an image file, if applicable

  @IsOptional()
  @IsInt()
  testId?: number; // References an existing Test, if applicable

  @IsOptional()
  @IsInt()
  sectionId?: number; // References an existing Section, if applicable

  // Array of options, each validated by the CreateOptionDto

  @ApiProperty({ type: [String] })
  @IsArray()
  options: string[];

  // Reference to the correct answer option ID
  @ApiProperty()
  @IsInt()
  correctOptionIndex?: number; // Should be the ID of one of the options provided

  @ApiProperty({ enum: Levels })
  @IsEnum(Levels)
  level: Levels;
}
