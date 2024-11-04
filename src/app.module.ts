import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JlptModule } from './jlpt/jlpt.module';

@Module({
  imports: [PrismaModule, JlptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
