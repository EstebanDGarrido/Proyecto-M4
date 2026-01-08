import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //* http://localhost:3000/ => path: GET "/"
  //*Método que maneja las solicitudes GET a la ruta raíz
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/*
CONTROLADOR: (CONTROLLER <Es una clase>) Se encarga de interactuar con el exterior y eventualmente
de hacer validaciones. 
(MANEJA LAS RUTAS)
Responsabilidades:
1. Recibir solicitudes: Escucha rutas y métodos HTTP definidos.
2. Validar y transformar datos (Opcionalmente) usa pipes o DTO's
para asegurar que la entrada sea correcta.
3. Llamar a los servicios: Deriva la lógica del negocio al servicio correspondiente.
4. Devolver respuestas: Retorna el resultado al cliente.

Si tuviera que definirlo como un restaurante, el controlador sería el mesero,
que toma la orden del cliente (solicitud), la lleva a la cocina (servicio), y luego
trae la comida de vuelta al cliente (respuesta).
*/
