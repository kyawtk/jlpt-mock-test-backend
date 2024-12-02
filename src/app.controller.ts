import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { S3Service } from './s3.service';
import { ApiBody, ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly s3Service: S3Service,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post('file')
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    required: true,
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        }
      }
    }
  })
  async uploadFile(@UploadedFile(new ParseFilePipe({
    validators:[
        new MaxFileSizeValidator({maxSize: 1024 * 1024 * 10}),
        new FileTypeValidator({fileType:'image/png'})
    ]
  })) file) {
    return this.s3Service.uploadFile(file);
  }
}


