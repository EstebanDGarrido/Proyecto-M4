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
import { UpdateUserDto, UserResponseDto } from './dto/users.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from './roles.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin) //['admin', 'superAdmin', 'tester']
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de página (paginado)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Usuarios por página (paginado)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente',
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (token faltante o inválido)',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado (requiere rol Admin)',
  })
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

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del usuario (UUID)',
    example: 'c7d9c17d-bb19-4f87-b05a-9de7f14567b3',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario obtenido exitosamente',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (token faltante o inválido)',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<Users, 'password' | 'isAdmin'>> {
    return this.userService.getUserById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del usuario (UUID)',
    example: 'c7d9c17d-bb19-4f87-b05a-9de7f14567b3',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Datos a actualizar del usuario (campos opcionales)',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos en la solicitud (e.g., formato incorrecto)',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (token faltante o inválido)',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userNewData: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, userNewData);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del usuario (UUID)',
    example: 'c7d9c17d-bb19-4f87-b05a-9de7f14567b3',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado exitosamente',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (token faltante o inválido)',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
