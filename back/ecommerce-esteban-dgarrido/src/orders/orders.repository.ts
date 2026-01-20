import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/orders/entities/orderdetails.entity';
import { Orders } from 'src/orders/entities/orders.entity';
import { Products } from 'src/products/entities/products.entity';
import { Users } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/orders.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ormOrdersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private ormOrderDetailRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private ormUsersRepository: Repository<Users>,
    @InjectRepository(Products)
    private ormProductsRepository: Repository<Products>,
  ) {}

  async getOrderById(id: string): Promise<Orders | string> {
    const order = await this.ormOrdersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) {
      return `Orden con id  ${id} no encontrada`;
    }
    return order;
  }

  async addOrder(newOrderData: CreateOrderDto): Promise<Orders[] | string> {
    const { userId, products } = newOrderData;
    const user = await this.ormUsersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }
    const order = new Orders();
    order.date = new Date();
    order.user = user;
    const newOrder = await this.ormOrdersRepository.save(order);
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.ormProductsRepository.findOneBy({
          id: element.id,
        });
        if (!product) {
          throw new NotFoundException(
            `Producto con id ${element.id} no encontrado`,
          );
        }
        if (product.stock <= 0) {
          throw new BadRequestException(
            `Stock insuficiente para el producto ${product.name}`,
          );
        }
        await this.ormProductsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );
    const total = productsArray.reduce(
      (sum, product) => sum + Number(product.price),
      0,
    );
    const orderDetail = new OrderDetails();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.ormOrderDetailRepository.save(orderDetail);
    return await this.ormOrdersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }
}
