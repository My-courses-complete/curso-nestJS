import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/services/products.service';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from '../dtos/order-product.dto';
import { OrderItem } from '../entities/order-product.entity';
import { OrdersService } from './orders.service';

@Injectable()
export class OrderProductService {
  constructor(
    private orderService: OrdersService,
    private productService: ProductsService,
    @InjectRepository(OrderItem)
    private orderProductRepository: Repository<OrderItem>,
  ) {}

  async create(data: CreateOrderProductDto) {
    const order = await this.orderService.findOne(data.orderId);
    const product = await this.productService.findOne(data.productId);
    const orderProduct = new OrderItem();
    orderProduct.order = order;
    orderProduct.product = product;
    orderProduct.quantity = data.quantity;
    return this.orderProductRepository.save(orderProduct);
  }
}
