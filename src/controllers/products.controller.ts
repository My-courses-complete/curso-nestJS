import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  get(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    return {
      message: `Productos ${limit} ${offset}`,
      data: this.productsService.findAll(),
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Producto creado',
      data: this.productsService.create(payload),
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id') id: string) {
    return {
      message: `Producto ${id}`,
      data: this.productsService.findOne(+id),
    };
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `Producto ${id} actualizado`,
      data: this.productsService.update(+id, payload),
    };
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    this.productsService.delete(+id);
    return {
      message: `Producto ${id} eliminado`,
    };
  }
}
