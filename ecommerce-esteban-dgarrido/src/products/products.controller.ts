import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/products/entities/products.entity';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ProductResponseDto, UpdateProductDto } from './dto/products.dto';

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

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newProductData: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, newProductData);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
