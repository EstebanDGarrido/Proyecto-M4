import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { OrderDetails } from '../../orders/entities/orderdetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @ApiProperty({
    description: 'uuid v4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ingresar una fecha con formato dd/mm/yyyy',
    example: '18/01/2026',
  })
  @Column()
  date: Date;

  //* OrderDetails 1:1 Orders
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  //   //* Orders N:1 Users
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
