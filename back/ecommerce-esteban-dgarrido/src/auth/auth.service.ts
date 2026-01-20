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

  async signIn(email: string, password: string) {
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (!foundUser || !foundUser.isActive)
      throw new UnauthorizedException(`Email o password incorrectos`);
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword)
      throw new UnauthorizedException('Email o password incorrectos');
    const payload = {
      id: foundUser.id,
      mail: foundUser.email,
      isAdmin: foundUser.isAdmin,
    };
    const token = this.jwtService.sign(payload);
    return {
      message: 'Usuario logueado',
      token,
    };
  }

  async signUp(newUserData: CreateUserDto) {
    const { email, password } = newUserData;
    if (!email || !password)
      throw new BadRequestException('Email y password son requeridos');
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser)
      throw new BadRequestException('Email ya se encuentra registrado');
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.usersRepository.addUser({
      ...newUserData,
      password: hashedPassword,
    });
  }
}
