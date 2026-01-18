import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Users } from '../users/entities/users.entity';
import { UpdateUserDto } from './dto/users.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from './roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // GET /users?page=2&limit=3
  @Get()
  @Roles(Role.Admin) //['admin', 'superAdmin', 'tester']
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  getAllUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Omit<Users, 'password'>[]> {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = pageNum > 0 && !isNaN(pageNum) ? pageNum : 1;
    const validLimit = limitNum > 0 && !isNaN(limitNum) ? limitNum : 5;

    return this.userService.getAllUsers(validPage, validLimit);
  }

  // GET /users/:id
  @Get(':id')
  @HttpCode(200)
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<Users, 'password' | 'isAdmin'>> {
    return this.userService.getUserById(id);
  }

  // PUT /users/:id
  @Put('id')
  @HttpCode(200)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userNewData: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, userNewData);
  }

  // DELETE /users/:id
  @Delete('id')
  @HttpCode(200)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
