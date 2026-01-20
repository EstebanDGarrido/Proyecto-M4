import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInResponseDto, SignUpResponseDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiBody({
    type: LoginUserDto,
    description: 'Credenciales de login',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario logueado exitosamente',
    type: SignInResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Credenciales inválidas',
  })
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Datos para crear el usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: SignUpResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o email ya registrado',
  })
  signUp(@Body() newUserData: CreateUserDto) {
    return this.authService.signUp(newUserData);
  }
}
