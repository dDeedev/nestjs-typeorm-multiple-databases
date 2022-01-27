import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
  .setTitle('Cars example')
  .setDescription('The cars API description')
  .setVersion('1.0')
  .addTag('cars')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
