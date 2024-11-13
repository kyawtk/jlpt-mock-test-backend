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
    return;
  }

  // Fetch all JLPT tests
  async getAllTests() {
    return this.prisma.test.findMany();
  }

  // Fetch a specific test by ID
  async getTestById(id: number) {
    return await this.prisma.test.findUnique({
      where: { id },
      include: {
        questions: true,
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
