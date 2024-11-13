import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Levels, QuestionTypes } from '@prisma/client';

interface GetQuestionsParams {
  type?: QuestionTypes;
  level?: Levels;
}

@Injectable()
export class QuestionService {
  //import prisma
  constructor(private readonly prisma: PrismaService) {}
  async create(createQuestionDto: CreateQuestionDto) {
    const question = await this.prisma.question.create({
      data: {
        level: createQuestionDto.level,
        content: createQuestionDto.content,
        type: createQuestionDto.type,
        passage: createQuestionDto.passage,
        audioUrl: createQuestionDto?.audioUrl,
        imageUrl: createQuestionDto?.imageUrl,
        options: createQuestionDto.options,
        correctOptionIndex: createQuestionDto?.correctOptionIndex,
      },
    });
    return question;
  }

  findAll(filters: GetQuestionsParams) {
    return this.prisma.question.findMany({
      where: filters,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return this.prisma.question.delete({
      where: {
        id,
      },
    });
  }
}
