// src/jlpt/jlpt.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Test } from '@prisma/client';
import { CreateTestDto } from './dto/jlpt.dto';

@Injectable()
export class JlptService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new JLPT test

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const { questions, ...testData } = createTestDto;

    const test = await this.prisma.test.create({
      data: {
        ...testData,
        questions: {
          create: questions.map((question) => ({
            ...question,
            options: {
              create: question.options.map((option) => ({
                label: option.label,
                content: option.content,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return test;
  }

  // Fetch all JLPT tests
  async getAllTests() {
    return this.prisma.test.findMany({
      include: {
        questions: {
          include: {
            options: true,
            answer: {
              include: {
                option: true, // Includes the related option content for the correct answer
              },
            },
            Section: true, // Includes section data if present
          },
        },
      },
    });
  }

  // Fetch a specific test by ID
  async getTestById(id: number) {
    return await this.prisma.test.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true, // Include options related to each question
          },
        },
      },
    });
  }

  // Update a test
  async updateTest(id: number, data: Prisma.TestUpdateInput) {
    return this.prisma.test.update({
      where: { id },
      data,
    });
  }

  // Delete a test
  async deleteTest(id: number) {
    return this.prisma.test.delete({ where: { id } });
  }
}
