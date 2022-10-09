import {
  Body,
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
  get(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    return {
      message: `Productos ${limit} ${offset}`,
      data: [],
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Producto creado',
      data: payload,
    };
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `Producto ${id}`;
  }

  @Put('/:id')
  update(@Param('id') id: string) {
    return `Actualizar producto ${id}`;
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return `Eliminar producto ${id}`;
  }
}
