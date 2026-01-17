import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Users } from '../users/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // GET /users?page=2&limit=3
  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  getAllUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Omit<Users, 'password'>[]> {
    const pageNum = Number(page); // Number(undefined); 0  Number("hola"); NaN
    const limitNum = Number(limit);

    const validPage = pageNum > 0 && !isNaN(pageNum) ? pageNum : 1;
    const validLimit = limitNum > 0 && !isNaN(limitNum) ? limitNum : 5;

    return this.userService.getAllUsers(validPage, validLimit);
  }

  // GET /users/:id
  @Get(':id')
  @HttpCode(200)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  // POST /users
  // Body: {name, email, password, ...}
  @Post()
  @HttpCode(201)
  addUser(@Body() userNewData: CreateUserDto) {
    //! Validaciones (Se borra más adelante):
    if (!userNewData.email) return 'Email es requerido';
    if (!userNewData.name) return 'Name es requerido';
    if (!userNewData.password) return 'Password es requerido';
    if (!userNewData.phone) return 'Phone es requerido';
    if (typeof userNewData.phone !== 'string') 'Phone debe ser un string';

    return this.userService.addUser(userNewData);
  }

  // PUT /users/:id
  // Body: {city, address, ...}
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

/*
  usuarios: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                      ^start ^end
  GET /users?page=2&limit=3
  GET /users/id/5
  page: 2      limit: 3

  page 1: [0, 1, 2]
  page 2: [3, 4, 5] <----
  ^start = (page -1)*limit = 3
  page 3: [6, 7, 8]
  ^end = start + limit
  page 4: [9]
*/
