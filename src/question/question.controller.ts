import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiBody({ type: CreateQuestionDto, isArray: true })
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto[]) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll(@Query() filters: FilterDto) {
    const filtersarr = {
      ...(filters.type && { type: filters.type }),
      ...(filters.level && { level: filters.level }),
    };
    const page = filters.page || 1;
    const limit = filters.limit || 10;

    return this.questionService.findAll(filtersarr, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
