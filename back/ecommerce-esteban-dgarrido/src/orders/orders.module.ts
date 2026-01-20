import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/orders/entities/orders.entity';
import { OrderDetails } from 'src/orders/entities/orderdetails.entity';
import { Users } from '../users/entities/users.entity';
import { Products } from 'src/products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
