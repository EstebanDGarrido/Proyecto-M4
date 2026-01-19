import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/users.dto';

export class SignUpResponseDto {
  @ApiProperty({ example: 'Usuario creado exitosamente' })
  message: string;
  @ApiProperty({
    type: Object,
    description: 'Datos del usuario creado (sin password)',
  })
  user: UserResponseDto;
}

export class SignInResponseDto {
  @ApiProperty({ example: 'Usuario Logueado' })
  message: string;
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;
}
