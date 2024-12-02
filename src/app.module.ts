import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { SwitchModule } from './switch/switch.module';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/validate.env';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
    }),
    MessageModule,

    UserModule,
    PassportModule,
    AuthModule,
    SwitchModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
