import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

//* El @Algo es un decorador que añade funcionalidades a quien está decorando.
@Module({
  imports: [UsersModule, ProductsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

/*
MÓDULO: Unidad organizativa principal de Nest JS
Responsabilidades:
1. Agrupar: Reunir controladores, servicios, proveedores y otros módulos que trabajan juntos.
2. Encapsular: Limitar el alcance de lo que se exporta, solo expone lo necesario a otros módulos.
3. Importar dependencias: Puede importar otros módulos para reutilizar sus servicios o controladores.
4. Registrar Providers: Define qué servicios (providers) están disponibles dentro del módulo.
*/
