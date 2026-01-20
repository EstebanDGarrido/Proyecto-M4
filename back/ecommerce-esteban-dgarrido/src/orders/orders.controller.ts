import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/orders.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener una orden por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único de la orden',
    example: 'c7d9c17d-bb19-4f87-b05a-9de7f14567b3',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden obtenida exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado (requiere rol Admin)',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada',
  })
  @Get(':id')
  getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrderById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiBody({
    type: CreateOrderDto,
    description: 'Datos para crear la orden',
  })
  @ApiResponse({
    status: 201,
    description: 'Orden creada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o producto sin stock',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o producto no encontrado',
  })
  @Post()
  addOrder(@Body() newOrderData: CreateOrderDto) {
    return this.ordersService.addOrder(newOrderData);
  }
}
