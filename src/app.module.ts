import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JlptModule } from './jlpt/jlpt.module';
import { QuestionModule } from './question/question.module';
import { MessageModule } from './message/message.module';
import { PassageModule } from './passage/passage.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    JlptModule,
    QuestionModule,
    MessageModule,
    PassageModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
