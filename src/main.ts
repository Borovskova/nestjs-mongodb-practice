import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: [
      'GET',
      'POST',
      'PATCH',
      'PUT',
      'DELETE',
    ],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Mongo education')
    .setDescription(
      'The mongo-education API description',
    )
    .setVersion('1.0')
    .addTag('mongoEducation')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  SwaggerModule.setup('api/doc', app, document);
  await app.listen(3000);
}
bootstrap();
