import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { CustomerService } from './customer.service';

@Injectable()
export class UsersService {
  constructor(
    private costumerServices: CustomerService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);
    if (data.customerId) {
      const customer = await this.costumerServices.findOne(data.customerId);
      newUser.customer = customer;
      if (!customer) {
        throw new NotFoundException(`Customer #${data.customerId} not found`);
      }
    }
    return this.userRepository.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.userRepository.merge(user, changes);
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  // async getOrdersByUser(id: number) {
  //   const user = this.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException(`User #${id} not found`);
  //   }
  //   return {
  //     date: new Date(),
  //     user,
  //     products: await this.productServices.findAll(),
  //   };
  // }
}
