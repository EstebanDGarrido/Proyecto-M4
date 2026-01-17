import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getOrderById(id: string) {
    return this.ordersRepository.getOrderById(id);
  }

  addOrder(newOrderData: any) {
    return this.ordersRepository.addOrder(newOrderData);
  }
}
