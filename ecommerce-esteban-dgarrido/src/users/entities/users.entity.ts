import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from '../../orders/entities/orders.entity';

@Entity({
  name: 'USERS',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'NOMBRE',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'int',
  })
  phone: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  //!Aquí agregamos nuevas entidades a la BBDD (Columnas)

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
