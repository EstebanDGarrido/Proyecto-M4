import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //* return false || lanza un error => NO DEJA PASAR
    //* return true ==> ME DEJA PASAR

    const request = context.switchToHttp().getRequest();
    //console.log(request.headers);

    const authHeaders = request.headers['authorization']; //* 'Bearer email:password'
    if (!authHeaders) return false;
    const auth = authHeaders.split(' ')[1]; //* 'email:password'
    if (!auth) return false;

    const [email, password] = auth.split(':');
    if (!email || !password) return false;

    return true;
  }
}
