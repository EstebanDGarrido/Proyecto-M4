import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/environment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('PM4BE/ecommerceft68 - EstebanDGarrido')
    .setDescription(
      'Proyecto backend para una aplicación de E-commerce, desarrollado con NestJS, TypeORM y PostgreSQL. Incluye autenticación JWT, gestión de usuarios, productos, categorías y órdenes, con documentación completa en Swagger.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
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
