import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //* http://localhost:3000/users => PATH "/users"
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
