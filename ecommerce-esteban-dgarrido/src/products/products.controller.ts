import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  // GET /products/:id
  @Get(':id')
  getProductById(@Param('id') id: string) {}

  // POST /Products
  //Body: {name, description, price, stock, imgURL}
  @Post()
  addProduct(@Body() newProductData: any) {}

  //PUT /products/:id
  //Body: {name, description, price, stock, imgURL}
  @Put('id')
  updateProduct(@Param('id') id: string, @Body() newProductData: any) {}

  //DELETE /products/:id
  @Delete('id')
  deleteUser(@Param('id') id: string) {}
}
