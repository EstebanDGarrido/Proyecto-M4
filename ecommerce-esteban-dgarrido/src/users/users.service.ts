import { Injectable } from '@nestjs/common';
import { User, UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.getAllUsers();
  }
}
