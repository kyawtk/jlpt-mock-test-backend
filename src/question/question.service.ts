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
  async create(createQuestionDto: CreateQuestionDto[]) {
    if (Array.isArray(createQuestionDto)) {
      return this.prisma.question.createMany({
        data: createQuestionDto.map((question) => ({
          level: question.level,
          content: question.content,
          type: question.type,
          passageId: question?.passageId,
          audioUrl: question?.audioUrl,
          imageUrl: question?.imageUrl,
          options: question.options,
          correctOptionIndex: question?.correctOptionIndex,
        })),
      });
    }
  }

  async findAll(filters: GetQuestionsParams, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [questions, total] = await Promise.all([
      this.prisma.question.findMany({
        include: {
          passage: true,
        },
        where: filters,
        skip: skip,
        take: limit,
      }),
      this.prisma.question.count({
        where: filters,
      }),
    ]);

    return {
      data: questions,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return null;
  }

  remove(id: number) {
    return this.prisma.question.delete({
      where: {
        id,
      },
    });
  }
}
