import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JlptModule } from './jlpt/jlpt.module';
import { QuestionModule } from './question/question.module';
import { MessageModule } from './message/message.module';
import { PassageModule } from './passage/passage.module';

@Module({
  imports: [PrismaModule, JlptModule, QuestionModule, MessageModule, PassageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
