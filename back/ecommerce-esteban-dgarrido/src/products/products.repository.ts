import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../categories/entities/categories.entity';
import { Products } from 'src/products/entities/products.entity';
import { Repository } from 'typeorm';
import data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private ormProductsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>,
  ) {}

  async getAllProducts(page: number, limit: number): Promise<Products[]> {
    const skip = (page - 1) * limit;
    const products = await this.ormProductsRepository.find({
      relations: {
        category: true,
      },
      skip: skip,
      take: limit,
    });
    return products;
  }

  async addProducts(): Promise<string> {
    const categories = await this.ormCategoriesRepository.find();
    await Promise.all(
      data.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category)
          throw new Error(`La categoría ${element.category} no existe`);
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;
        await this.ormProductsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'Productos agregados';
  }

  async getProductById(id: string): Promise<Products> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return product;
  }

  async updateProduct(
    id: string,
    productNewData: Partial<Products>,
  ): Promise<Products | null> {
    await this.ormProductsRepository
      .createQueryBuilder()
      .update(Products)
      .set(productNewData)
      .where('id = :id', { id })
      .execute();
    const updatedProduct = await this.ormProductsRepository.findOneBy({
      id,
    });
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<{ message: string; id: string }> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`Producto con id ${id} no encontrado`);

    try {
      await this.ormProductsRepository.delete(id);
      return {
        message: 'Producto eliminado exitosamente',
        id: product.id,
      };
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(
          'No se puede eliminar el producto porque está asociado a órdenes',
        );
      }
      throw error;
    }
  }
}
