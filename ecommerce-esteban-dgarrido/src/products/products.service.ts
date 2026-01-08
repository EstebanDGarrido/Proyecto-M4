import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getAllProducts(): string {
    return 'Todos los productos';
  }
}
