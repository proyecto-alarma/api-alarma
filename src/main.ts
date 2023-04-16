import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PipeResponseBase } from './common/pipe/response.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new PipeResponseBase(),
  );
  app.setGlobalPrefix('api/alarma')
  app.enableCors();


  await app.listen(process.env.PORT|| 3000,()=>{
    console.log('Running int porct',process.env.PORT);
  });
}
bootstrap(); 
