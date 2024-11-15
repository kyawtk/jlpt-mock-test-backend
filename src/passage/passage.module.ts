import { Module } from '@nestjs/common';
import { PassageService } from './passage.service';
import { PassageController } from './passage.controller';

@Module({
  controllers: [PassageController],
  providers: [PassageService],
})
export class PassageModule {}
