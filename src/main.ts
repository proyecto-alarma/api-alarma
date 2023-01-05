import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PipeResponseBase } from './common/pipe/response.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new PipeResponseBase(),
    
  );
  app.setGlobalPrefix('api/v1/')
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
