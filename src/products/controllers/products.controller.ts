import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  async get(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    return {
      message: `Productos ${limit} ${offset}`,
      data: await this.productsService.findAll(),
    };
  }

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return {
      message: 'Producto creado',
      data: await this.productsService.create(payload),
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `Producto ${id}`,
      data: await this.productsService.findOne(+id),
    };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return {
      message: `Producto ${id} actualizado`,
      data: await this.productsService.update(+id, payload),
    };
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.delete(id);
  }
}
