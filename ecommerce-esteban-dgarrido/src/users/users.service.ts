import { Injectable } from '@nestjs/common';
import { User, UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers(page: number, limit: number): Promise<Omit<User, 'password'>[]> {
    return this.usersRepository.getAllUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  addUser(userNewData: any) {
    return this.usersRepository.addUser(userNewData);
  }

  updateUser(id: string, userNewData: any) {
    return this.usersRepository.updateUser(id, userNewData);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
