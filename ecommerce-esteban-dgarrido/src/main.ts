import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Class-Validator (middleware)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT = environment.PORT;
  const HOST = environment.HOST;

  await app.listen(PORT);

  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
}
bootstrap();

/*
La función de boostrap, significa que es el primer paso,
para iniciar la aplicación de NestJS
*/
