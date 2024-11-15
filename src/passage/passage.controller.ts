import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePassageDto } from './dto/create-passage.dto';
import { PassageService } from './passage.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('passage')
export class PassageController {
  constructor(private readonly passageService: PassageService) {}

  @ApiBody({ type: CreatePassageDto })
  @Post()
  create(@Body() createPassageDto: CreatePassageDto) {
    return this.passageService.create(createPassageDto);
  }

  @Get()
  findAll() {
    return this.passageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passageService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passageService.remove(+id);
  }
}
