import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { CustomerService } from '../services/customer.service';
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomerService) {}
  @Get()
  getCustomers() {
    return this.customerService.findAll();
  }

  @Get('/:id')
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  @Post()
  createCustomer(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put('/:id')
  updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, payload);
  }

  @Delete('/:id')
  deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }
}
