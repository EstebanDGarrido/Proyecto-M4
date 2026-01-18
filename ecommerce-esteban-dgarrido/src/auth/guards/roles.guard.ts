import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  //* 1. Accedemos a la metadata:
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //* 2. Accedemos a la metadata:
    const routeRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    //* routeRoles: 'admin'

    //* 3. Acceder al Request:
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.roles)
      throw new ForbiddenException('Usuario no autenticado o sin roles');
    const userRoles = user.roles;
    //* userRoles = 'admin' || 'user'

    //* Validación de rol:
    // routeRoles = ['tester', 'admin']  userRoles = ['superAdmin', 'admin']
    const hasRole = () => routeRoles.some((role) => userRoles.includes(role)); //['admin', 'superAdmin', 'tester']
    const valid = hasRole();
    if (!valid)
      throw new ForbiddenException(
        'El usuario no tiene permisos para acceder a la ruta',
      );
    return true;
  }
}
