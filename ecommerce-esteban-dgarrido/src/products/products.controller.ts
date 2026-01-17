import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products
  @Get()
  getAllProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit)
      return this.productsService.getAllProducts(Number(page), Number(limit));
    return this.productsService.getAllProducts(Number(1), Number(5));
  }

  // /products/seeder
  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  // GET /products/:id
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  // // POST /Products
  // //Body: {name, description, price, stock, imgURL}
  // @Post()
  // addProduct(@Body() newProductData: any) {}

  //PUT /products/:id
  //Body: {name, description, price, stock, imgURL}
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() newProductData: Products) {
    return this.productsService.updateProduct(id, newProductData);
  }

  //DELETE /products/:id
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
