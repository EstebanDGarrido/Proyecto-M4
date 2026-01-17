import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
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
      skip: skip, //* Salta los registros anteriores
      take: limit, //* Limita la cantidad de registros devueltos
    });
    return products;
  }

  async addProducts(): Promise<string> {
    // Traemos todas las categorías:
    const categories = await this.ormCategoriesRepository.find();
    // categories: [ { id, name}, { id, name}]
    await Promise.all(
      data.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        // Verificamos que la categoría del producto exista:
        if (!category)
          throw new Error(`La categoría ${element.category} no existe`);
        // Creamos nuevo Producto y seteamos atributos:
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;
        // Grabamos el nuevo Producto en la Base de datos:
        await this.ormProductsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          // Si el producto existe, lo actualizamos:
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'Productos agregados';
  }

  async getProductById(id: string): Promise<Products | string> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product) {
      return `Producto con id ${id} no encontrado`;
    }
    return product;
  }

  async updateProduct(
    id: string,
    productNewData: Products,
  ): Promise<Products | null> {
    await this.ormProductsRepository.update(id, productNewData);
    const updatedProduct = await this.ormProductsRepository.findOneBy({
      id,
    });
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<string | null> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product) return null;
    await this.ormProductsRepository.delete(id);
    return product.id;
  }
}
