import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { CustomerService } from './customer.service';
import { UsersService } from './users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private customerServices: CustomerService,
    private userService: UsersService,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async findOneByCustomer(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    const order = await this.orderRepository.findOne({
      where: { customer: { id: user.customer.id } },
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${userId} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerServices.findOne(data.customerId);
      order.customer = customer;
    }
    return this.orderRepository.save(order);
  }

  async update(id: number, data: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (data.customerId) {
      const customer = await this.customerServices.findOne(data.customerId);
      order.customer = customer;
    }
    return this.orderRepository.save(order);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
