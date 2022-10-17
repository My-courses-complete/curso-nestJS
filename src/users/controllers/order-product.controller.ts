import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderProductDto } from '../dtos/order-product.dto';
import { OrderProductService } from '../services/order-product.service';

@Controller('order-product')
export class OrderProductController {
  constructor(private orderProductService: OrderProductService) {}

  @Post()
  createOrderProduct(@Body() data: CreateOrderProductDto) {
    return this.orderProductService.create(data);
  }
}
