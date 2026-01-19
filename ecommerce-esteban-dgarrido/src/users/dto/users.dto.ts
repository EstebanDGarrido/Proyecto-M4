import { PartialType, PickType, OmitType } from '@nestjs/mapped-types';
import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
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
  /**
   * Debe ser un string de entre 3 y 80 caracteres.
   * @example 'Homer'
   */
  @IsNotEmpty({ message: 'Nombre no puede estar vacío' })
  @IsString({ message: 'Nombre debe ser un string' })
  @MinLength(3, { message: 'Nombre de al menos 3 caracteres' })
  @MaxLength(80, { message: 'Nombre de máximo 80 caracteres' })
  name: string;

  /**
   * Debe ser un email válido.
   * @example 'Homer@mail.com'
   */
  @IsNotEmpty({ message: 'Email no puede estar vacío' })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  /**
   * La contraseña debe ser un string con al menos una minúscula, una mayúscula, un número y un símbolo: !@#$%^&*.
   * @example 'Homero123*'
   */
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

  /**
   * Debe ser igual al password.
   * @example 'Homero123*'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * Debe ser un número.
   * @example '11112222'
   */
  @IsNotEmpty({ message: 'Teléfono no puede estar vacío' })
  @IsNumber()
  phone: number;

  /**
   * Debe ser un string de entre 3 y 80 caracteres.
   * @example 'Avenida Siempreviva 742'
   */
  @IsString({ message: 'Dirección debe ser un string' })
  @MinLength(3, { message: 'Dirección de al menos 3 caracteres' })
  @MaxLength(80, { message: 'Dirección de máximo 80 caracteres' })
  address: string;

  /**
   * Debe ser un string de entre 5 a 20 caracteres.
   * @example 'Springfield*'
   */
  @IsString({ message: 'Ciudad debe ser un string' })
  @MinLength(5, { message: 'Ciudad de al menos 5 caracteres' })
  @MaxLength(20, { message: 'Ciudad de máximo 20 caracteres' })
  city: string;

  /**
   * Debe ser un string de entre 5 a 20 caracteres.
   * @example 'United States'
   */
  @IsString({ message: 'País debe ser un string' })
  @MinLength(5, { message: 'País de al menos 5 caracteres' })
  @MaxLength(20, { message: 'País de máximo 20 caracteres' })
  country: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['name', 'email', 'password', 'phone']),
) {}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
