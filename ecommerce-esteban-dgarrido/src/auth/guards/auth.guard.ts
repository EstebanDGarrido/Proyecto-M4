import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers['authorization'];
    if (!authHeaders) throw new UnauthorizedException('No se ha enviado token');
    const [type, token] = authHeaders.split(' ');
    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException('No se ha enviado token');
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = this.jwtService.verify(token, {
        secret: secret,
      });
      payload.roles = payload.isAdmin ? [Role.Admin] : [Role.User]; //['admin', 'superAdmin', 'tester']
      request.user = payload;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('El token ha expirado');
      }
      throw new UnauthorizedException('El token no es valido');
    }
    return true;
  }
}
