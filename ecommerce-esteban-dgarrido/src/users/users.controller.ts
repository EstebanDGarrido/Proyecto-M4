import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //* http://localhost:3000/users => PATH "/users"
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
