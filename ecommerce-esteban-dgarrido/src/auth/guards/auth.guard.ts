import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/config/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

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
      const payload = this.jwtService.verify(token, {
        secret: environment.JWT_SECRET,
      });
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
