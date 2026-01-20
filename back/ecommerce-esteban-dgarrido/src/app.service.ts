import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

/*
SERVICIO: (PROVIDER) Contiene la lógica de negocio o procesamiento de datos.
(Colección de métodos)
Responsabilidades:
1. Procesar la lógica del negocio: Calcular, filtrar, transformar
o ejecutar reglas específicas.
2. Acceder a la base de datos o APIs externas: Llamar a repositorios, modelos
u otros servicios.
3. Reutilizar funcionalidad: Puede ser inyectado en múltiples controladores
o incluso en otros servicios.
4. Mantener el código limpio: Separa la lógica de la capa de presentación
(controladores).
*/
