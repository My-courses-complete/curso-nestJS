import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders() {
    return 'Get orders';
  }

  @Get('/:id')
  getOrder(@Param('id') id: string) {
    return `Get order ${id}`;
  }

  @Post()
  createOrder() {
    return 'Create order';
  }

  @Put('/:id')
  updateOrder(@Param('id') id: string) {
    return `Update order ${id}`;
  }

  @Delete('/:id')
  deleteOrder(@Param('id') id: string) {
    return `Delete order ${id}`;
  }
}
