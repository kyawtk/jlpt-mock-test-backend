// src/jlpt/jlpt.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { JlptService } from './jlpt.service';
import { Prisma } from '@prisma/client';
import { CreateTestDto } from './dto/jlpt.dto';

@Controller('jlpt')
export class JlptController {
  constructor(private readonly jlptService: JlptService) {}

  @Post()
  async createTest(@Body() data: CreateTestDto) {
    return this.jlptService.create(data);
  }

  @Get()
  async getAllTests() {
    return this.jlptService.getAllTests();
  }

  @Get(':id')
  async getTestById(@Param('id' , ParseIntPipe) id: number) {
    return this.jlptService.getTestById(id);
  }


  @Put(':id')
  async updateTest(@Param('id') id: string, @Body() data: Prisma.TestUpdateInput) {
    return this.jlptService.updateTest(Number(id), data);
  }

  @Delete(':id')
  async deleteTest(@Param('id') id: string) {
    return this.jlptService.deleteTest(Number(id));
  }
}
