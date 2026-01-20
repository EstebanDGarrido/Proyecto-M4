import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../categories/entities/categories.entity';
import { Repository } from 'typeorm';
import data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>,
  ) {}

  async getAllCategories(): Promise<Categories[]> {
    return await this.ormCategoriesRepository.find();
  }

  async addCategories(): Promise<string> {
    const insertPromises = data.map((element) =>
      this.ormCategoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute(),
    );
    await Promise.all(insertPromises);
    return 'Categorías agregadas';
  }
}
