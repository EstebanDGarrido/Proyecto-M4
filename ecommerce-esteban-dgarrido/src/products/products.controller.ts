import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //* http://localhost:3000/products GET
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }
}
