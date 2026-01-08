import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  console.log('Servidor escuchando en el puerto 3000');
}
bootstrap();

/*
La función de boostrap, significa que es el primer paso,
para iniciar la aplicación de NestJS
*/
