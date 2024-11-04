import { Module } from '@nestjs/common';
import { JlptService } from './jlpt.service';
import { JlptController } from './jlpt.controller';

@Module({
  providers: [JlptService],
  controllers: [JlptController]
})
export class JlptModule {}
