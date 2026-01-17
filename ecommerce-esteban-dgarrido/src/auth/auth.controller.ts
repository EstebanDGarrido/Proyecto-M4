import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* http://localhost:3000/ GET
  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  //* POST auth/signin
  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}

//* UsersController =====> UsersService ======> UsersRepository ==> [usuarios...]
//* AuthController (signIn) => AuthService (SignIn)
//*                   email,  pass --- email, pass (BBDD)
