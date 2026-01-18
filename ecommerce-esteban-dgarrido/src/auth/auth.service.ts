import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return 'Auth';
  }

  //*LOGIN:
  async signIn(email: string, password: string) {
    //* 1. verificar que exista el usuario:
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (!foundUser)
      throw new UnauthorizedException(`Email o password incorrectos`);

    //* 2. comprobar contraseña:
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword)
      throw new UnauthorizedException('Email o password incorrectos');

    //* 3. Firmar el Token y retornarlo
    const payload = {
      id: foundUser.id,
      mail: foundUser.email,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario logueado',
      token,
    };
  }

  //* REGISTRO:
  //* Users =>
  //* DTO => En body del Request
  async signUp(newUserData: CreateUserDto) {
    const { email, password } = newUserData;
    if (!email || !password)
      throw new BadRequestException('Email y password son requeridos');

    //* 1. Verificar que el email sea único y no se encuentre registrado:
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser)
      throw new BadRequestException('Email ya se encuentra registrado');

    //* 2. Hashear la contraseña:
    const hashedPassword = await bcrypt.hash(password, 10);

    //* 3. Crear al nuevo usuario:
    return await this.usersRepository.addUser({
      ...newUserData,
      password: hashedPassword,
    });
  }
}
