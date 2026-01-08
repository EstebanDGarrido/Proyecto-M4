import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* http://localhost:3000/ GET
  @Get()
  getAuth() {
    return this.authService.getAuth();
  }
}
