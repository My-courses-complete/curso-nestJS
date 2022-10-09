import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    return `Limit: ${limit} - Offset: ${offset}`;
  }

  @Post()
  createProduct() {
    return 'Crear producto';
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return `Producto ${id}`;
  }

  @Put('/:id')
  updateProduct(@Param('id') id: string) {
    return `Actualizar producto ${id}`;
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return `Eliminar producto ${id}`;
  }
}
