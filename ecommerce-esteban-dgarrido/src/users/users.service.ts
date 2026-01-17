import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from '../users/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers(page: number, limit: number): Promise<Omit<Users, 'password'>[]> {
    return this.usersRepository.getAllUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  addUser(userNewData: CreateUserDto) {
    return this.usersRepository.addUser(userNewData);
  }

  updateUser(id: string, userNewData: UpdateUserDto) {
    return this.usersRepository.updateUser(id, userNewData);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
