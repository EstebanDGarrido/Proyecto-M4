import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { UpdateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getAllProducts(page: number, limit: number) {
    return this.productsRepository.getAllProducts(page, limit);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  updateProduct(id: string, productNewData: UpdateProductDto) {
    return this.productsRepository.updateProduct(id, productNewData);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
