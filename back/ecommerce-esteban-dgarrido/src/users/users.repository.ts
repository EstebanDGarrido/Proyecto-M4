import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private ormUsersRepository: Repository<Users>,
  ) {}

  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password'>[]> {
    const skip = (page - 1) * limit;
    const allUsers = await this.ormUsersRepository.find({
      where: { isActive: true },
      skip: skip,
      take: limit,
    });
    return allUsers.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string): Promise<Omit<Users, 'password' | 'isAdmin'>> {
    const foundUser = await this.ormUsersRepository.findOne({
      where: { id, isActive: true },
      relations: {
        orders: true,
      },
    });
    if (!foundUser)
      throw new NotFoundException(`No se encontró el usuario con id ${id}`);
    const { password, isAdmin, ...filteredUser } = foundUser;
    return filteredUser;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.ormUsersRepository.findOneBy({ email, isActive: true });
  }

  async addUser(
    newUserData: CreateUserDto,
  ): Promise<{ message: string; id: string }> {
    const user = this.ormUsersRepository.create({
      name: newUserData.name,
      email: newUserData.email,
      password: newUserData.password,
      phone: newUserData.phone,
      address: newUserData.address,
      city: newUserData.city,
      country: newUserData.country,
    });

    const savedUser = await this.ormUsersRepository.save(user);

    return {
      message: 'Usuario creado exitosamente',
      id: savedUser.id,
    };
  }

  async updateUser(
    id: string,
    newUserData: UpdateUserDto,
  ): Promise<Omit<Users, 'password'> | string> {
    const user = await this.ormUsersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`No existe usuario con id ${id}`);
    const mergedUser = this.ormUsersRepository.merge(user, newUserData);
    const savedUser = await this.ormUsersRepository.save(mergedUser);
    const { password, ...userNoPassword } = savedUser;
    return userNoPassword;
  }

  // BORRADO LÓGICO - El usuario se marca como inactivo pero los datos persisten
  async deleteUser(id: string) {
    const foundUser = await this.ormUsersRepository.findOneBy({
      id,
      isActive: true,
    });
    if (!foundUser)
      throw new NotFoundException(`No existe usuario activo con id ${id}`);

    foundUser.isActive = false;
    await this.ormUsersRepository.save(foundUser);

    return {
      message: 'Usuario eliminado exitosamente',
      id: foundUser.id,
    };
  }
}
