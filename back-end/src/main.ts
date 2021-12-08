import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { existsSync, mkdirSync } from 'fs';
import config from './config/configuration';
import { JwtAuthGuard } from './lib/auth/guard/jwt-auth.guard';
import { join } from 'path';

async function bootstrap() {
  const env = config();

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 미들웨어 설정
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator(@)가 없는 속성이 들어오면 해당 속성은 제거하고 받아들입니다.
      forbidNonWhitelisted: false, // DTO에 정의되지 않은 값이 넘어오면 request 자체를 막습니다.
      transform: true, // 클라이언트에서 값을 받자마자 타입을 정의한대로 자동 형변환을 합니다.
    }),
  );

  // 가드설정
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // 파일 스토리지 설정
  if (!existsSync(env.fileStorage.root)) mkdirSync(env.fileStorage.root);
  if (!existsSync(env.fileStorage.root + env.fileStorage.crn_path))
    mkdirSync(env.fileStorage.root + env.fileStorage.crn_path);
  if (!existsSync(env.fileStorage.root + env.fileStorage.mrn_path))
    mkdirSync(env.fileStorage.root + env.fileStorage.mrn_path);

  // Swagger 문서툴 설정
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API server')
    .setDescription("The API server's API description")
    .setVersion('1.0')
    .addTag('인증 API')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // 서버 실행
  await app.listen(process.env.SV_PORT);
}
bootstrap();
