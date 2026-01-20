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
import { ProductsService } from './products.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ProductResponseDto, UpdateProductDto } from './dto/products.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { DeleteResponseDto } from 'src/common/dto/response.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de productos paginada' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de página (por defecto: 1)',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Productos por página (por defecto: 5)',
    example: '5',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente',
    type: [ProductResponseDto],
  })
  @Get()
  getAllProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit)
      return this.productsService.getAllProducts(Number(page), Number(limit));
    return this.productsService.getAllProducts(Number(1), Number(5));
  }

  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del producto (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido exitosamente',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (token faltante o inválido)',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado (requiere rol Admin)',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      ejemplo: {
        value: {
          Nuevodato: 'NuevaDescripción',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (token faltante o inválido)',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado (requiere rol Admin)',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newProductData: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, newProductData);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del producto (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado exitosamente',
    type: DeleteResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'No se puede eliminar el producto porque está asociado a órdenes',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (token faltante o inválido)',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado (requiere rol Admin)',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
