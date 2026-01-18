import { PartialType, PickType, OmitType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nombre no puede estar vacío' })
  @IsString({ message: 'Nombre debe ser un string' })
  @MinLength(3, { message: 'Nombre de al menos 3 caracteres' })
  @MaxLength(80, { message: 'Nombre de máximo 80 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'Email no puede estar vacío' })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  @IsNotEmpty({ message: 'Contraseña no puede estar vacío' })
  @IsString({ message: 'Password debe ser un string' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Contraseña debe tener al menos una minúscula, una mayúscula, un número y un símbolo: !@#$%^&*',
    },
  )
  password: string;

  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @IsNotEmpty({ message: 'Teléfono no puede estar vacío' })
  @IsNumber()
  phone: number;

  @IsString({ message: 'Dirección debe ser un string' })
  @MinLength(3, { message: 'Dirección de al menos 3 caracteres' })
  @MaxLength(80, { message: 'Dirección de máximo 80 caracteres' })
  address: string;

  @IsString({ message: 'Ciudad debe ser un string' })
  @MinLength(5, { message: 'Ciudad de al menos 5 caracteres' })
  @MaxLength(20, { message: 'Ciudad de máximo 20 caracteres' })
  city: string;

  @IsString({ message: 'País debe ser un string' })
  @MinLength(5, { message: 'País de al menos 5 caracteres' })
  @MaxLength(20, { message: 'País de máximo 20 caracteres' })
  country: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['name', 'email', 'password', 'phone']),
) {}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
