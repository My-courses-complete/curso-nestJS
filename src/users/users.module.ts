import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './services/customer.service';
import { CustomersController } from './controllers/customers.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-product.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomerService, OrdersService],
})
export class UsersModule {}
