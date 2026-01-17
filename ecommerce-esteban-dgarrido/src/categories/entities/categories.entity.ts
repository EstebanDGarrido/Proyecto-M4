import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from '../../products/entities/products.entity';

@Entity({
  name: 'CATEGORIES',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  //* Categories 1:N Products
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
