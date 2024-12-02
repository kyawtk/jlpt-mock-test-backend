// file: aws-s3 > src > app.service.ts
import { Injectable, Req, Res } from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { uuid } from 'uuidv4';
import { extname } from 'node:path';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './utils/validate.env';




@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string;
  constructor(private readonly configService: ConfigService<EnvironmentVariables>) {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = process.env.S3_BUCKET_NAME;
  }
  async uploadFile(file: Express.Multer.File) {
    const fileKey = `jlpt/${uuid()}${extname(file.originalname)}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size,
    });
    const res = await this.s3.send(command);

    return res;
  }
}
