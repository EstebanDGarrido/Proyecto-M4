import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getOrderById(id: string) {
    return this.ordersRepository.getOrderById(id);
  }

  addOrder(newOrderData: CreateOrderDto) {
    return this.ordersRepository.addOrder(newOrderData);
  }
}
