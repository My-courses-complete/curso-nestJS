import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers() {
    return 'Get customers';
  }

  @Get('/:id')
  getCustomer(@Param('id') id: string) {
    return `Get customer ${id}`;
  }

  @Post()
  createCustomer() {
    return 'Create customer';
  }

  @Put('/:id')
  updateCustomer(@Param('id') id: string) {
    return `Update customer ${id}`;
  }

  @Delete('/:id')
  deleteCustomer(@Param('id') id: string) {
    return `Delete customer ${id}`;
  }
}
