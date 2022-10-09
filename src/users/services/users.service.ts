import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private productServices: ProductsService) {}

  private counter = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '123456',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    this.counter++;
    const newUser = {
      id: this.counter,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, changes: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrdersByUser(id: number) {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return {
      date: new Date(),
      user,
      products: this.productServices.findAll(),
    };
  }
}
