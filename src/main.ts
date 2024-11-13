import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Jlpt ')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    // .addSecurityRequirements('bearer')
    .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    // Set up the Swagger UI at a specific endpoint, such as "/api"
    SwaggerModule.setup('api', app, document);

  await app.listen(8000);
  // Log a message once the app is running
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
