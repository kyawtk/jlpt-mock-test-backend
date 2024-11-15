import { Injectable } from '@nestjs/common';
import { CreatePassageDto } from './dto/create-passage.dto';
import { UpdatePassageDto } from './dto/update-passage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PassageService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPassageDto: CreatePassageDto) {
    return this.prisma.passage.create({
      data: createPassageDto,
    });
  }

  findAll() {
    return this.prisma.passage.findMany();
  }

  findOne(id: number) {
    return this.prisma.passage.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.passage.delete({
      where: { id },
    });
  }
}
